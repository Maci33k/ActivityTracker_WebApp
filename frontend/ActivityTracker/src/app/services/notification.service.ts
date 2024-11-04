import { Injectable } from '@angular/core';
import { ScoresSharedService } from '../shared/scores-shared.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private scoreData: ScoresSharedService, private http: HttpClient){}

   badScoreNotifications: string[] = [
    'Dziś mogło być lepiej',
    'Nie był to najlepszy dzień',
    'Dziś mało kroków',
    'Jutro zrób więcej kroków',
    'Niski wynik kroków',

    'Niska ilość spalonych kalorii',
    'Niski wynik spalonych kalorii',
    'Jutro spal więcej kalorii',
    'Warto zwiększyć spalanie kalorii',
    'Liczba kalorii poniżej połowy celu',

    'Sen poniżej oczekiwań',
    'Zwiększ czas snu',
    'Wyśpij się',
    'Bardzo niski wynik snu',

    'Za mało wypitej wody!',
    'Niskie nawodnienie – pamiętaj jutro!',
    'Zbyt mało płynów wypite!',
    'Uwaga! Niedostateczne nawodnienie!'
  ];

  normalScoreNotifications: string[] = [
    'Dobry wynik! Jutro spróbuj więcej',
    'Blisko celu! Jutro dorzuć więcej kroków',
    'Świetna praca! Jutro możesz osiągnąć więcej',

    'Osiągnąłeś ponad połowę celu kalorii!',
    'Dobrze! Jesteś blisko swojego celu',
    'Dobre postępy! Do celu jeszcze trochę!',
    'Osiągnąłeś ponad połowę celu kalorii!',

    'Dobry sen, ale może być lepszy',
    'Sen OK, jutro może być lepiej',

    'Dobra robota z nawodnieniem!',
    'Świetnie, że pamiętasz o piciu wody!',
    'Świetne nawodnienie!'
  ];

  goodScoreNotifications: string[] = [
    'Już prawie!',
    'Twoje kroki są prawie idealne',
    'Jeszcze trochę a osiągniesz 100% kroków',

    'Prawie osiągnałeś cel kalorii',
    'Jeszcze trochę aktywności w ciągu dnia',
    'Świetny wynik kalorii',

    'Blisko do pełnego nawodnienia',
    'Wypiłeś dziś dużo wody!',
    'Twoje nawodnienie wygląda świetnie',

    'Prawie idealny sen',
    'Długość snu bardzo dobra'
  ];

  perfectScoreNotifications: string[] = [
    'Gratulacje, osiągnąłeś swój cel!',
    'Twoje ciało Ci dziękuje!',
    'Doskonała praca nad zdrowiem!',

    'Brawo, osiągnąłeś swój cel kaloryczny!',
    'Twoje ciało pracuje na pełnych obrotach!',

    'Gratulacje, Twój sen był idealny!',
    'Pełen sen, pełnia zdrowia!',

    'Idealnie nawodniłeś swój organizm!',
    'Wypiłeś tyle wody ile trzeba'
  ];

  badScoreAdvices: string[] = [
    'Dziś było trochę spokojniej, ale pamiętaj, że nawet niewielka aktywność ma duży wpływ na Twoje zdrowie. Jeśli jutro osiągniesz chociaż połowę celu, poczujesz się bardziej energicznie i poprawisz swoją kondycję. To również szansa na lepszy sen i obniżenie poziomu stresu. Każdy krok to inwestycja w Twoje zdrowie na przyszłość',
    'Nie zawsze jest czas na długie spacery, ale każdy krok się liczy. Spróbuj jutro zrobić więcej, a zobaczysz, jak pozytywnie wpłynie to na Twoje samopoczucie. Nawet połowa celu to krok w stronę lepszego zdrowia! Regularne spacery pomagają również w kontrolowaniu wagi i poprawie nastroju, a dodatkowo mogą zwiększyć Twoją wytrzymałość i siłę',
    'Każdy dzień jest inny, a dziś mogło być mniej aktywnie. Jutro spróbuj zwiększyć liczbę kroków, nawet jeśli osiągniesz tylko połowę celu. Twoje serce i umysł będą Ci za to wdzięczne! Pamiętaj, że ruch to naturalny sposób na redukcję stresu i poprawę koncentracji. Małe zmiany w codziennej rutynie mogą prowadzić do dużych korzyści w dłuższym okresie',
    'Nie zawsze jest łatwo być aktywnym, ale regularne kroki to klucz do zdrowia. Jutro spróbuj zrobić trochę więcej, aby osiągnąć przynajmniej połowę celu. Zobaczysz, jak pozytywnie wpłynie to na Twój nastrój i energię! Systematyczna aktywność może też poprawić Twój układ krążenia i pomóc w walce z uczuciem zmęczenia. Każdy dodatkowy krok to krok w stronę lepszego życia',
    'Dziś mogło być mniej ruchu, ale to nic straconego. Już połowa celu kroków jutro może przynieść znaczące korzyści dla Twojego zdrowia i samopoczucia. Spróbuj i zobacz, jak dobrze się poczujesz! Zwiększona aktywność fizyczna może także wzmocnić Twoją odporność i poprawić trawienie. Pamiętaj, że każda aktywność, nawet niewielka, zbliża Cię do lepszego zdrowia',

    'Dziś spaliłeś mniej kalorii, co może wpłynąć na Twoje zdrowie serca. Regularne spalanie kalorii poprzez aktywność fizyczną jest kluczowe dla utrzymania zdrowia układu sercowo-naczyniowego. Codzienne ćwiczenia pomagają obniżyć ryzyko chorób serca, poprawiają krążenie krwi, wzmacniają mięśnie serca oraz regulują poziom cholesterolu. Jutro warto spróbować zwiększyć intensywność ćwiczeń, aby wspierać swoje serce, poprawić ogólną kondycję i zwiększyć odporność na stres',
    'Dziś Twoje spalanie kalorii było niskie, ale pamiętaj, że regularna aktywność fizyczna ma kluczowe znaczenie dla utrzymania zdrowej wagi i efektywnego metabolizmu. Spalanie kalorii wspomaga proces utraty tkanki tłuszczowej, zwiększa tempo metabolizmu i poprawia zdolność organizmu do spalania tłuszczu nawet w spoczynku. Jutro postaraj się zwiększyć poziom aktywności, aby wspierać zdrową masę ciała, poprawić samopoczucie oraz utrzymać równowagę energetyczną',
    'Niskie spalanie kalorii dzisiaj może wpływać na Twoje samopoczucie i poziom energii. Regularne ćwiczenia powodują uwalnianie endorfin, które są naturalnymi substancjami chemicznymi poprawiającymi nastrój oraz redukującymi uczucie stresu i lęku. Aktywność fizyczna przyczynia się również do lepszej jakości snu oraz ogólnej poprawy samopoczucia. Zwiększenie aktywności fizycznej jutro pomoże Ci poprawić nastrój, zwiększyć energię oraz poczuć się lepiej zarówno psychicznie, jak i fizycznie',
    'Dziś spaliłeś mniej kalorii, co może wpłynąć na funkcjonowanie Twojego układu odpornościowego. Regularne spalanie kalorii poprzez ćwiczenia jest korzystne dla układu odpornościowego, ponieważ wspiera jego funkcjonowanie i może pomóc w zapobieganiu infekcjom oraz chorobom. Aktywność fizyczna poprawia krążenie krwi, co wspiera transport komórek odpornościowych w organizmie. Jutro warto zwiększyć poziom aktywności, aby wspierać swoje zdrowie, poprawić odporność oraz zredukować ryzyko infekcji',
    'Dziś Twoje spalanie kalorii było poniżej oczekiwań, ale pamiętaj, że regularne ćwiczenia mają znaczący wpływ na zdrowie metaboliczne. Spalanie kalorii pomaga w regulacji poziomu cukru we krwi oraz poprawia wrażliwość na insulinę, co jest kluczowe w zapobieganiu rozwojowi cukrzycy typu 2. Regularna aktywność fizyczna wspiera również zdrową funkcję układu pokarmowego i przyczynia się do lepszej przemiany materii. Jutro postaraj się zwiększyć aktywność fizyczną, aby wspierać zdrowie metaboliczne, poprawić funkcjonowanie organizmu i osiągnąć lepsze wyniki zdrowotne',

    'Niski wynik snu dzisiaj może wpłynąć na Twoje zdrowie psychiczne i fizyczne. Niedostateczna ilość snu zwiększa ryzyko zaburzeń nastroju, takich jak depresja i lęk. Spróbuj wprowadzić regularny harmonogram snu, aby poprawić jakość snu, co pomoże w stabilizacji nastroju i poprawie ogólnego samopoczucia. Regularny sen wspiera również zdrową funkcję mózgu i poprawia koncentrację oraz pamięć',
    'Mała ilość snu może wpływać na Twoje funkcje poznawcze oraz zdolność do podejmowania decyzji. Chroniczny niedobór snu obniża zdolność koncentracji, osłabia pamięć i zwiększa ryzyko błędów w codziennych zadaniach. Zadbaj o odpowiednią ilość snu każdej nocy, aby wspierać swoje zdrowie mózgu i poprawić funkcje poznawcze, co pozytywnie wpłynie na Twoją efektywność i codzienne funkcjonowanie',
    'Niewystarczająca ilość snu może prowadzić do problemów z metabolizmem, takich jak przyrost wagi i zwiększone ryzyko cukrzycy typu 2. Sen jest kluczowy dla regulacji apetytu i metabolizmu glukozy. Aby wspierać zdrową wagę i metabolizm, staraj się spać co najmniej 7-9 godzin każdej nocy. Regularny sen pomaga w utrzymaniu równowagi hormonalnej i poprawia procesy metaboliczne w organizmie',
    'Niski wynik snu może wpłynąć na Twoje zdrowie sercowo-naczyniowe. Chroniczny niedobór snu zwiększa ryzyko nadciśnienia, chorób serca i udarów mózgu. Aby poprawić zdrowie serca, zadbaj o regularny i wystarczający sen. Wprowadzenie zdrowych nawyków przed snem, takich jak unikanie kofeiny i ekranów, może pomóc w osiągnięciu lepszej jakości snu i wspierać zdrowie układu sercowo-naczyniowego',

    'Pij wodę regularnie przez cały dzień, nie czekaj aż poczujesz pragnienie. Małe łyki co godzinę pomagają utrzymać nawodnienie i wspierają prawidłowe funkcjonowanie organizmu. Pamiętaj, że uczucie pragnienia to sygnał, że organizm już potrzebuje wody, więc lepiej nie dopuszczać do tego stanu. Rozważ ustawienie przypomnień na telefonie, aby regularnie pić wodę, szczególnie jeśli masz napięty grafik i łatwo zapominasz o nawodnieniu',
    'Rozpocznij dzień od szklanki wody zaraz po przebudzeniu. To nie tylko pobudza metabolizm, ale również uzupełnia płyny utracone podczas snu. Wypicie wody na czczo może także wspomóc oczyszczenie organizmu z toksyn i przygotować układ trawienny do przyjęcia posiłków. Dodaj do porannej wody odrobinę soku z cytryny, aby wspomóc detoksykację i dodać sobie energii na cały dzień',
    'Noś ze sobą butelkę wody, aby mieć ją zawsze pod ręką. To ułatwi Ci regularne picie i pomoże uniknąć odwodnienia, zwłaszcza w upalne dni. Wybierz butelkę, która jest dla Ciebie wygodna i estetyczna – może to zwiększyć Twoją motywację do częstszego sięgania po wodę. Jeśli często zapominasz o wodzie, spróbuj wyznaczyć sobie cele, np. wypicie całej butelki do południa, a kolejnej do końca dnia',
    'Dodaj do wody kawałek cytryny, mięty lub ogórka, aby wzbogacić smak. Może to zachęcić Cię do częstszego sięgania po wodę i utrzymania odpowiedniego nawodnienia. Eksperymentuj z różnymi dodatkami, aby znaleźć ulubioną kombinację smaków – może to być także imbir, jagody czy plasterki pomarańczy. Smakowa woda jest nie tylko przyjemniejsza do picia, ale może również dostarczać dodatkowych witamin i antyoksydantów, co pozytywnie wpłynie na Twoje zdrowie'
  ];

  normalScoreAdvices: string[] = [
    'Jesteś na dobrej drodze! Aby utrzymać tempo, spróbuj zwiększyć intensywność swojego spaceru. Szybszy krok przez kilka minut lub wchodzenie po schodach zamiast windy pomoże spalić więcej kalorii i doda kilka dodatkowych kroków do dziennego wyniku. Możesz także rozważyć wprowadzenie interwałów – na przemian chodzenie w normalnym tempie i szybszym krokiem – co sprawi, że Twój spacer będzie bardziej efektywny i dynamiczny',
    'Dobra robota z dzisiejszymi krokami! Zastanów się nad dodaniem krótkich przerw na rozciąganie lub szybki marsz w ciągu dnia. Taka aktywność nie tylko zwiększy liczbę kroków, ale również poprawi krążenie i obniży poziom stresu. Jeśli pracujesz przy biurku, wstawanie co godzinę na krótki spacer po biurze może pomóc Ci uniknąć sztywności mięśni i dodać dodatkowe kroki do Twojego wyniku. Zadbaj o to, by w ciągu dnia regularnie się ruszać – Twoje ciało Ci za to podziękuje!',
    'Twoje kroki są ok! Aby jeszcze bardziej je zwiększyć, spróbuj zmienić codzienną trasę, wybierając dłuższą drogę do pracy czy sklepu. Małe zmiany w rutynie mogą przynieść zaskakujące rezultaty i sprawić, że osiągniesz jeszcze lepszy wynik. Możesz także spróbować nowych aktywności, takich jak wędrówki po lesie czy spacery po parku, które dodadzą świeżości Twoim codziennym krokom. Znalezienie nowych tras może również sprawić, że spacerowanie stanie się bardziej ekscytujące i motywujące do dalszej aktywności',

    'Świetnie! Jesteś blisko celu spalania kalorii! Aby zwiększyć liczbę spalanych kalorii, spróbuj dodać do swojej rutyny krótkie, intensywne sesje cardio. Możesz wypróbować trening interwałowy, który polega na naprzemiennym wykonywaniu intensywnych ćwiczeń z krótkimi okresami odpoczynku. Tego typu treningi są efektywne w spalaniu kalorii i poprawiają kondycję w krótszym czasie',
    'Dobre wyniki! Aby osiągnąć pełny cel kalorii, zwiększ swoją aktywność fizyczną. Dodaj codzienne spacery lub wybierz się na rower, aby zwiększyć dzienną liczbę spalanych kalorii. Nawet krótki spacer po obiedzie może zwiększyć ogólne spalanie energii i pomóc w osiągnięciu celu. Staraj się wprowadzać aktywność do codziennych czynności, takich jak wspinanie się po schodach zamiast korzystania z windy',
    'Jesteś na dobrej drodze! Aby zwiększyć spalanie kalorii, spróbuj wprowadzić trening siłowy. Ćwiczenia z obciążeniem, takie jak podnoszenie ciężarów czy przysiady, pomagają budować masę mięśniową, która w spoczynku spala więcej kalorii. Dodanie 2-3 sesji treningu siłowego do tygodnia może znacząco zwiększyć Twoje dzienne spalanie kalorii',
    'Świetna robota! Aby osiągnąć pełny cel spalania kalorii, rozważ zwiększenie czasu spędzanego na aktywności fizycznej. Możesz spróbować dłuższych sesji cardio, takich jak bieganie czy pływanie, które efektywnie spalają kalorie. Nawet jeśli jesteś zmęczony po pracy, krótkie, ale intensywne ćwiczenia mogą pomóc Ci nadrobić zaległości i osiągnąć swój cel',

    'Aby poprawić jakość snu, spróbuj ustalić regularny harmonogram snu i budzenia się. Idź spać i budź się o tej samej porze każdego dnia, nawet w weekendy. Taki regularny rytm pomoże ustabilizować zegar biologiczny, co może prowadzić do głębszego i bardziej regenerującego snu',
    'Aby poprawić jakość snu, zadbaj o komfort swojej sypialni. Upewnij się, że pokój jest chłodny, ciemny i cichy. Rozważ użycie zasłon zaciemniających, maski na oczy lub zatyczek do uszu, jeśli otoczenie jest głośne. Odpowiednia atmosfera w sypialni sprzyja lepszemu zasypianiu i spokojnemu snu',
    'Aby jeszcze bardziej poprawić sen, zwróć uwagę na wieczorną rutynę. Unikaj intensywnych ćwiczeń, kofeiny i ciężkich posiłków na kilka godzin przed snem. Zamiast tego, wprowadź relaksujące czynności, takie jak czytanie książki, ciepła kąpiel czy medytacja. Takie nawyki mogą pomóc Ci się odprężyć i ułatwić zasypianie',
    'Aby poprawić jakość snu, staraj się unikać korzystania z urządzeń elektronicznych przed snem. Niebieskie światło emitowane przez telefony, tablety i komputery może zaburzać produkcję melatoniny i utrudniać zasypianie. Spróbuj wprowadzić zasady cyfrowego detoksu na godzinę przed snem, aby dać swojemu mózgowi czas na naturalne przygotowanie się do snu',

    'Aby poprawić swoje wyniki, spróbuj zwiększyć spożycie wody w ciągu dnia. Postaraj się pić wodę regularnie, a nie tylko wtedy, gdy poczujesz pragnienie. Możesz ustawić przypomnienia na telefonie co godzinę lub nosić ze sobą butelkę z zaznaczoną ilością, którą powinieneś wypić do końca dnia. Taki nawyk pomoże Ci systematycznie zwiększyć ilość wypijanej wody',
    'Aby poprawić swoje nawodnienie, rozważ włączenie większej ilości wody do swojej rutyny. Możesz na przykład wypić szklankę wody przed każdym posiłkiem, co nie tylko pomoże Ci utrzymać odpowiednie nawodnienie, ale również wspiera zdrowe trawienie i może pomóc w kontrolowaniu apetytu',
    'Aby zwiększyć swoje nawodnienie, spróbuj wprowadzić do diety napoje wzbogacające płyny, takie jak herbaty ziołowe czy woda kokosowa. Te napoje nie tylko pomagają w utrzymaniu odpowiedniego poziomu nawodnienia, ale mogą również dostarczyć dodatkowych minerałów i witamin, które wspierają zdrowie',
    'Aby jeszcze bardziej poprawić swoje wyniki, staraj się włączyć do swojego planu dnia dodatkowe porcje wody. Możesz na przykład pić wodę podczas wykonywania codziennych czynności, takich jak praca przy komputerze czy oglądanie telewizji. Utrzymywanie butelki z wodą w zasięgu ręki i picie małych łyczków regularnie pomoże Ci zwiększyć całkowite spożycie płynów'
  ];

  goodScoreAdvices: string[] = [
    'Blisko mety, korzyści już widoczne! - Już teraz Twoje serce i układ krążenia czerpią korzyści z tego, co osiągnąłeś. Badania pokazują, że regularne spacery poprawiają kondycję serca i obniżają ryzyko chorób sercowo-naczyniowych. Brakuje Ci już niewiele kroków, aby zyskać jeszcze więcej!',
    'Każdy krok się liczy! - Każdy dodatkowy krok to nie tylko krok bliżej celu, ale także wzmocnienie mięśni i kości. Nawet kilka minut dodatkowego spaceru zwiększa gęstość kości i pomaga zapobiegać osteoporozie.',
    'Pamiętaj o zdrowiu psychicznym! - Spacery nie tylko poprawiają kondycję fizyczną, ale także wpływają na zdrowie psychiczne. Badania wykazują, że regularna aktywność fizyczna, jak spacer, zmniejsza stres, poprawia nastrój i zwiększa poziom energii. Te ostatnie kroki mogą dodać Ci pozytywnej energii na resztę dnia!',
    'Osiągnij to, co zacząłeś! - Jesteś tak blisko swojego celu! Regularne osiąganie wyznaczonych celów, nawet tych małych, wzmacnia poczucie spełnienia i satysfakcji. Zrób te ostatnie kroki i zakończ dzień z dumą, wiedząc, że dałeś z siebie wszystko!',

    'Jesteś blisko dodatkowej porcji zdrowia! - Już teraz spaliłeś imponującą liczbę kalorii, co przekłada się na lepszą kontrolę wagi i metabolizm. Brakuje Ci tylko kilku kalorii, aby osiągnąć pełny efekt! Nawet drobna aktywność, jak krótki spacer, może spalić te ostatnie kalorie i przyczynić się do lepszego zdrowia',
    'Każda kaloria to krok ku zdrowszemu sercu! - Spalanie kalorii to więcej niż tylko liczby. Każda spalona kaloria pomaga obniżyć poziom cholesterolu, co zmniejsza ryzyko chorób sercowo-naczyniowych. Jesteś już prawie na mecie, te ostatnie kalorie mogą zrobić różnicę!',
    'Twój metabolizm pracuje na pełnych obrotach! - Już teraz Twój organizm korzysta ze wzmożonego metabolizmu. Spalenie tych kilku dodatkowych kalorii zwiększy tempo przemiany materii, co przyspiesza procesy spalania tłuszczu. Nie przestawaj, jesteś o krok od maksymalnych korzyści!',
    'Poczuj satysfakcję z osiągnięcia celu! - Zbliżasz się do swojego dziennego celu spalania kalorii. Ukończenie tego zadania to nie tylko krok do lepszej sylwetki, ale także wzmocnienie Twojej determinacji. Ostatnie spalone kalorie dadzą Ci poczucie spełnienia i motywację na przyszłość!',

    'Jesteś na prostej drodze do pełnego nawodnienia! - Już teraz Twój organizm korzysta z wypitej wody, co wspomaga trawienie, oczyszczanie organizmu i utrzymanie odpowiedniego poziomu energii. Wypij jeszcze trochę, a osiągniesz optymalne nawodnienie, które sprawi, że poczujesz się jeszcze lepiej!',
    'Każdy łyk to wsparcie dla Twojego zdrowia! - Picie wody to klucz do zdrowej skóry, lepszej koncentracji i wydajności fizycznej. Brakuje Ci tylko kilku łyków, aby w pełni nawodnić organizm i zyskać wszystkie te korzyści. Warto zadbać o siebie do końca dnia!',
    'Pijąc wodę, dbasz o swoje ciało i umysł! - Regularne picie wody wpływa korzystnie na funkcjonowanie mózgu, poprawiając pamięć i nastrój. Te ostatnie szklanki wody mogą zwiększyć Twoją koncentrację i sprawić, że poczujesz się bardziej wypoczęty. Nie odpuszczaj, jesteś blisko!',
    'Osiągnij pełne nawodnienie i poczuj różnicę! - Jesteś już prawie na mecie swojego dziennego celu. Utrzymanie odpowiedniego poziomu nawodnienia wspiera Twoje mięśnie i stawy, co jest kluczowe dla dobrego samopoczucia. Wypij ostatnie szklanki wody i zakończ dzień z pełnym nawodnieniem!',

    'Jesteś o krok od pełnej regeneracji! - Już teraz Twój organizm korzysta z przespanych godzin, regenerując mięśnie, układ nerwowy i wspierając układ odpornościowy. Brakuje Ci tylko odrobiny snu, aby zapewnić sobie maksymalną regenerację i obudzić się pełen energii!',
    'Każda dodatkowa minuta snu to inwestycja w zdrowie! - Ostatnie minuty snu mogą znacząco poprawić Twoją koncentrację, pamięć i nastrój na cały dzień. Warto poświęcić te kilka chwil więcej, by osiągnąć idealną ilość snu i obudzić się wypoczętym.',
    'Twój mózg potrzebuje tego snu! - Podczas snu mózg przetwarza informacje i wzmacnia wspomnienia. Te ostatnie minuty snu mogą poprawić Twoją zdolność do rozwiązywania problemów i zwiększyć kreatywność. Nie przegap tej szansy na pełne wykorzystanie mocy swojego umysłu!',
    'Osiągnij idealny sen i poczuj różnicę! - Jesteś już prawie na mecie swojego snu. Ukończenie tego cyklu snu nie tylko poprawi Twoje samopoczucie, ale także wzmocni Twój układ odpornościowy i przygotuje Cię na wyzwania nowego dnia. Zasługujesz na pełny, zdrowy sen!'
  ];

  perfectScoreAdvices: string[] = [
    'Twoje zaangażowanie w regularne spacery już teraz przynosi efekty. Twoje serce i układ krążenia są w lepszej kondycji, a mięśnie i stawy są mocniejsze. Każdy zrobiony krok to inwestycja w długoterminowe zdrowie!',
    'Idealnie wykonany cel kroków to więcej niż tylko liczba – to lepsze samopoczucie i większa odporność na choroby. Codzienna aktywność fizyczna, jak dzisiejsze spacery, obniża ryzyko cukrzycy, nadciśnienia i wielu innych schorzeń',
    'Dzięki dzisiejszym krokom dostarczyłeś swojemu ciału i umysłowi mnóstwo energii. Regularne spacery zwiększają poziom endorfin, poprawiając nastrój i redukując stres. Dziś osiągnąłeś idealny balans!',
    'Osiągając dzienny cel kroków, wspierasz zdrowie serca, wzmacniasz mięśnie i poprawiasz wydolność organizmu. Kontynuowanie tego rytmu pomoże Ci utrzymać formę i zdrowie przez długi czas!',

    'Dzisiaj udało Ci się spalić dokładnie tyle kalorii, ile zaplanowałeś. To idealna równowaga, która wspiera utrzymanie zdrowej wagi i dobrego samopoczucia. Twoje zaangażowanie przynosi realne korzyści zdrowotne!',
    'Dzięki dzisiejszym spalonym kaloriom wspierasz zdrowe funkcjonowanie metabolizmu. To krok ku lepszej kontroli wagi, co jest kluczowe dla długotrwałego zdrowia i zapobiegania chorobom przewlekłym.',
    'Idealnie spalona ilość kalorii to nie tylko liczby – to krok w kierunku lepszego zdrowia sercowo-naczyniowego, większej wydolności i lepszego samopoczucia. Dzisiejszy dzień był świetnym przykładem dbałości o siebie!',
    'Spalenie dzisiejszej ilości kalorii to idealna dawka dla Twojego zdrowia. Pomogłeś swojemu organizmowi w spalaniu tłuszczu, poprawie kondycji i redukcji ryzyka chorób. Kontynuuj ten rytm, a będziesz cieszyć się zdrowiem przez długie lata!',

    'Osiągnięcie pełnego, regenerującego snu to najlepszy prezent, jaki możesz dać swojemu ciału i umysłowi. Dzięki temu jesteś w pełni gotowy na wyzwania nowego dnia, z większą koncentracją i lepszym samopoczuciem.',
    'Dzięki idealnemu snu Twój mózg przetworzył i utrwalił wszystkie dzisiejsze informacje. Jesteś teraz bardziej skoncentrowany, kreatywny i gotowy do działania. Sen to klucz do sukcesu, a Ty osiągnąłeś go dziś perfekcyjnie!',
    'Twój idealny sen to podstawa dobrego zdrowia, zarówno fizycznego, jak i psychicznego. Regularne dbanie o jakość snu wspiera Twoje serce, poprawia nastrój i wzmacnia odporność. Dziś zrobiłeś to doskonale!',

    'Osiągnąłeś dzienny cel picia wody, co przynosi ogromne korzyści zdrowotne. Twoje ciało jest teraz doskonale nawodnione, co wspiera funkcje narządów, poprawia trawienie i dodaje energii.',
    'Dzięki odpowiedniemu nawodnieniu wszystkie procesy w Twoim organizmie przebiegają sprawniej. Idealnie osiągnięty cel picia wody pomaga w oczyszczaniu organizmu z toksyn, poprawia wygląd skóry i wspiera zdrowie nerek.',
    'Picie odpowiedniej ilości wody to podstawa dobrego samopoczucia. Dziś osiągnąłeś idealny poziom nawodnienia, co wpływa korzystnie na koncentrację, energię i ogólną kondycję.',
    'Dzięki idealnemu poziomowi nawodnienia, Twój organizm działa w pełni efektywnie. Kontynuując ten zdrowy nawyk, wspierasz swoje zdrowie na długie lata. Dziś był perfekcyjny dzień pod względem nawodnienia!'

  ];

  createNotificationTitle(activityType: string): any {
    var randomNotificationTitle: number | undefined;
    if(activityType == 'steps') {
      if(this.scoreData.stepsScore == 25) {
        randomNotificationTitle = this.drawRandomNumber(0, 4);
        return this.badScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.stepsScore == 50) {
        randomNotificationTitle = this.drawRandomNumber(0, 2);
        return this.normalScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.stepsScore == 75) {
        randomNotificationTitle = this.drawRandomNumber(0, 2);
        return this.goodScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.stepsScore == 100) {
        randomNotificationTitle = this.drawRandomNumber(0, 2);
        return this.perfectScoreNotifications[randomNotificationTitle];
      }
    }
    if(activityType == 'calories') {
      if(this.scoreData.caloriesScore == 25) {
        randomNotificationTitle = this.drawRandomNumber(5,9);
        return this.badScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.caloriesScore == 50) {
        randomNotificationTitle = this.drawRandomNumber(3,6);
        return this.normalScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.caloriesScore == 75) {
        randomNotificationTitle = this.drawRandomNumber(3,5);
        return this.goodScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.caloriesScore == 100) {
        randomNotificationTitle = this.drawRandomNumber(3,4);
        return this.perfectScoreNotifications[randomNotificationTitle];
      }
    }
    if(activityType == 'sleep') {
      if(this.scoreData.sleepScore == 25) {
        randomNotificationTitle = this.drawRandomNumber(10,13);
        return this.badScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.sleepScore == 50) {
        randomNotificationTitle = this.drawRandomNumber(7,8);
        return this.normalScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.sleepScore == 75) {
        randomNotificationTitle = this.drawRandomNumber(9,10);
        return this.goodScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.sleepScore == 100) {
        randomNotificationTitle = this.drawRandomNumber(5,6);
        return this.perfectScoreNotifications[randomNotificationTitle];
      }
    }
    if(activityType == 'water') {
      if(this.scoreData.waterScore == 25) {
        randomNotificationTitle = this.drawRandomNumber(14, 17);
        return this.badScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.waterScore == 50) {
        randomNotificationTitle = this.drawRandomNumber(9, 11);
        return this.normalScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.waterScore == 75) {
        randomNotificationTitle = this.drawRandomNumber(6, 8);
        return this.goodScoreNotifications[randomNotificationTitle];
      }
      if(this.scoreData.waterScore == 100) {
        randomNotificationTitle = this.drawRandomNumber(7, 8);
        return this.perfectScoreNotifications[randomNotificationTitle];
      }
    }

    return 'Error';
  }

  createAdvice(activityType: string): string {
    var randomAdvice: number | undefined;
    if(activityType == 'steps') {
      if(this.scoreData.stepsScore == 25) {
        randomAdvice = this.drawRandomNumber(0, 4);
        return this.badScoreAdvices[randomAdvice];
      }
      if(this.scoreData.stepsScore == 50) {
        randomAdvice = this.drawRandomNumber(0, 2);
        return this.normalScoreAdvices[randomAdvice];
      }
      if(this.scoreData.stepsScore == 75) {
        randomAdvice = this.drawRandomNumber(0, 3);
        return this.goodScoreAdvices[randomAdvice];
      }
      if(this.scoreData.stepsScore == 100) {
        randomAdvice = this.drawRandomNumber(0, 3);
        return this.perfectScoreAdvices[randomAdvice];
      }
    }
    if(activityType == 'calories') {
      if(this.scoreData.caloriesScore == 25) {
        randomAdvice = this.drawRandomNumber(5,9);
        return this.badScoreAdvices[randomAdvice];
      }
      if(this.scoreData.caloriesScore == 50) {
        randomAdvice = this.drawRandomNumber(3,6);
        return this.normalScoreAdvices[randomAdvice];
      }
      if(this.scoreData.caloriesScore == 75) {
        randomAdvice = this.drawRandomNumber(4,7);
        return this.goodScoreAdvices[randomAdvice];
      }
      if(this.scoreData.caloriesScore == 100) {
        randomAdvice = this.drawRandomNumber(4,7);
        return this.perfectScoreAdvices[randomAdvice];
      }
    }
    if(activityType == 'sleep') {
      if(this.scoreData.sleepScore == 25) {
        randomAdvice = this.drawRandomNumber(10,13);
        return this.badScoreAdvices[randomAdvice];
      }
      if(this.scoreData.sleepScore == 50) {
        randomAdvice = this.drawRandomNumber(7,10);
        return this.normalScoreAdvices[randomAdvice];
      }
      if(this.scoreData.sleepScore == 75) {
        randomAdvice = this.drawRandomNumber(12,15);
        return this.goodScoreAdvices[randomAdvice];
      }
      if(this.scoreData.sleepScore == 100) {
        randomAdvice = this.drawRandomNumber(8,10);
        return this.perfectScoreAdvices[randomAdvice];
      }
    }
    if(activityType == 'water') {
      if(this.scoreData.waterScore == 25) {
        randomAdvice = this.drawRandomNumber(14,17);
        return this.badScoreAdvices[randomAdvice];
      }
      if(this.scoreData.waterScore == 50) {
        randomAdvice = this.drawRandomNumber(11,14);
        return this.normalScoreAdvices[randomAdvice];
      }
      if(this.scoreData.waterScore == 75) {
        randomAdvice = this.drawRandomNumber(8,11);
        return this.goodScoreAdvices[randomAdvice];
      }
      if(this.scoreData.waterScore == 100) {
        randomAdvice = this.drawRandomNumber(11,14);
        return this.perfectScoreAdvices[randomAdvice];
      }
    }

     return 'Error';
  }

  drawRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  postNotification(resultsID: number, userID: number, notificationTitle: string, advice: string, activityType: string) {
     const notification = {
      Id: 0,
      UserID: userID,
      ResultsID: resultsID,
      NotificationTitle: notificationTitle,
      Advice: advice,
      ActivityType: activityType
     };

     console.log("Próbujesz dodać do bazy danych taki rekord: ", notification);

    return this.http.post('https://localhost:7217/api/Notifications', notification);
  }

  getNotifications(userID: number, activityDataID: number): Observable<any> {
    return this.http.get(`https://localhost:7217/api/Notifications/${userID}/today?ActivityDataID=${activityDataID}`);
  }

  deleteNotifications(userID: number): Observable<any> {
    return this.http.delete(`https://localhost:7217/api/Notifications/${userID}`);
  }

}
