Instrukcja do zainstalowania się z gitem na naszych VMkach. 
Może się zdarzyć, że coś nie będzie dokładnie tak jak piszę, bo niestety nie zapisałem instrukcji krok po kroku gdy wszystko robiłem od zera :(.

1. Dodaj nową kartę sieciową do maszyny wirtualnej. Na zatrzymanej maszynie: Settings -> Network -> Adapter 2. Ustaw "Attached to:" na NAT, reszta może zostać na defaultach.

2. Odpal maszynę, zaloguj się (dlibra/dlibra), komenda "ifconfig -a". Zlokalizuj dodaną, nieaktywną kartę sieciową (poznasz ją po tym, że nie ma IP i w ogóle bieda w chuj). U mnie to było eth2. Zapamiętaj nazwę.

3. Otwórz plik /etc/network/interfaces do edycji i dodaj na końcu dwie linijki:
auto eth2
iface eth2 inet dhcp
Oczywiście eth2 zastąp nazwą interfejsu odczytaną w punkcie 2. Zrestartuj maszynę wirtualną "sudo shutdown -r now".

4. Sprawdź czy masz łączność z internetem, przykładowo przez "ping 8.8.8.8". Jeśli nie ma łączności, kombinuj na własną rękę lub napisz. Stawiam że pomiędzy punktem 2 i 3 trzeba było aktywować kartę sieciową. Zobacz czy na liście aktywnych interfejsów "ifconfig" znajduje się nowa karta sieciowa z poprawnym adresem IP.

5. Zainstaluj gita. "sudo apt-get install git".

== Następne dwa punkty są sponsorowane przez StackOverflow http://stackoverflow.com/questions/5377960/whats-the-best-practice-to-git-clone-into-an-existing-folder ==
6. Sklonuj repozytorium do TYMCZASOWEGO katalogu. Moja propozycja:
cd /home/dlibra
git clone https://github.com/kanguro/dlibra.git

7. Zassaliśmy całe repozytorium bez sensu, bo interesuje nas tylko katalog .git i plik .gitignore. Skopiuj obydwa z tymczasowego katalogu do katalogu /home/dlibra/dlibra-webapp-5.5.0
cp -r /home/dlibra/dlibra/.git /home/dlibra/dlibra-webapp-5.5.0.
cp /home/dlibra/dlibra/.gitignore /home/dlibra/dlibra-webapp-5.5.0

8. Przejdź do dlibra-webapp-5.5.0 i sprawdź "git status". Jeśli wszystko poszło dobrze, dostaniesz komunikat "On branch master, nothing to commit". Dla pewności "git pull --rebase origin master". 

9. Zrób testowy commit, preferowana forma to utworzenie pliku "<imie>_daciuk.txt" z zawartością "Jan Daciuk". Zobacz czy poprawnie dodał się na repozytorium na githubie: https://github.com/kanguro/dlibra/commits/master

10. Odpal serwer i jego kolegów według instrukcji od Karola. Przypomnienie dla leniwych:
postgres &
./home/dlibra/dlibra-server-5.5.0/dlibra-server.sh console &
./home/dlibra/apache-tomcat-6.0.36/bin/startup.sh
Sprawdź czy przeglądarka łączy się z aplikacją wbijając taki adres: dlibra-app:8080

11. Jeśli wszystko poszło ok, możesz skasować tymczasowy katalog z punktu 6 "rm -rf /home/dlibra/dlibra".
