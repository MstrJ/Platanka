![Platanka = Next.js + .NET CORE API](https://cdn.discordapp.com/attachments/429588515022569472/1169010197688234014/platankaBannerGITHUB.png?ex=6553d896&is=65416396&hm=fc6d32108c43d649a31d74021487603d6308c7864b2fd79b4387e56739778e02&)

<h3>
<p>Strona internetowa PlatAnka, jest serwisem dającą możliwość prezentacji i sprzedaży przedmiotów. Platforma daje możliwość użytkownikom zainteresowania się opcją zamówienia m.in. dekoracji wnętrz, zabawek dla dzieci czy przedmiotów stworzonych przy użyciu 
techniki szydełkowania.</p>
</h3>

## Projekt podzielony jest na trzy główne części:

- Front-End (**Strona Internetowa**) - Odpowiedzialny za interfejs wizualny

- Back-End (**API**) - Odpowiedzialny za część logiczną

- Dev-Ops - Odpowiedzialny za izolacje projektem i skalowaniem aplikacji

<br>

## Frond-End (Strona Internetowa)

**Front-End**, który odpowiedzialny jest za strone internetową. Został stworzony w środowisku [Visual Studio Code](https://code.visualstudio.com/), z wykorzystaniem języka [Typescript](https://www.typescriptlang.org/), biblioteki [React](https://react.dev/) oraz framework'a [Next.js](https://nextjs.org/).

### Używane Biblioteki:

Najważniejszą biblioteką wykorzystywaną jest [React](https://react.dev/), jest mózgiem strony internetowej.
Jednym z ważnieszych aspektów strony internetowej jest część wizualna, która jest wspierana przez technologie [Tailwind](https://tailwindcss.com/) oraz [NextUI](https://nextui.org/). Oprócz części wizualnej serwisu, równie ważnym fragmentem też jest autoryzacja użytkownika od strony sesji na stronie czy ciasteczek cookie, która jest wspierana przez [NextAuth](https://next-auth.js.org/), jaka m.in. umożliwia logowanie / rejestrowanie się przez Google.

<br>

## Back-End (API)

**Back-End** obejmuje Restful API, odpowiedzialne za logikę strony internetowej. Zostało stworzone w środowisku [Visual Studio](https://visualstudio.microsoft.com/pl/), przy użyciu języka
[C#](https://learn.microsoft.com/pl-pl/dotnet/csharp/) oraz z użyciem framework'a [.NET CORE](https://learn.microsoft.com/pl-pl/aspnet/core/introduction-to-aspnet-core).
Najważniejszą częścią strony internetowej od strony logicznej jest właśnie Back-End. Odpowiada za wszyskie działania związane z zarządzaniem danymi.

### Używana Biblioteka

W celu weryfikacji użytkownika program wykorzystywuje [MailKit](https://github.com/jstedfast/MailKit), który umożliwia wysłania wiadomości na email.

### Baza Danych

Serwis PlatAnka wykorzystuje baze danych NoSQL [MongoDB](https://www.mongodb.com/).

<br>

## Dev-Ops

**Dev-Ops** wykorzystuje serwis PlatAnka w zakresie programu [Docker](https://www.docker.com/), który umożliwia przechowywanie i uruchamianie wszystkich instancji aplikacji WEB, API oraz bazy danych za pomocą narzędzia docker-compose. To zapewnia efektywną izolację środowiska i umożliwia łatwe skalowanie aplikacji.

## Działanie serwisu PlatAnka

## ! Projekt jest nadal rozwijany !

<br>

### Projekt Stworzony przez

## [Jakub Kruliczak](https://github.com/MstrJ)
