<script lang="ts">
	import Header from '$lib/components/Header.svelte';
</script>

<a href="/" class="no-underline">
	<Header />
</a>

<div class="mt-20 mb-4 max-w-4xl mx-auto px-2">
	<h1>Impressum</h1>
	<h2>Angaben gemäß § 5 TMG</h2>
	<p>Matthias Rohmer</p>

	<h2>Kontakt</h2>
	<p>E-Mail: matthias@rohmer.rocks</p>

	<p>Die Anschrift erhalten Sie auf Anfrage.</p>

	<h2>Haftung für Inhalte</h2>
	<p>
		Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
		allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
		nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
		Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
	</p>
	<p>
		Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
		Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
		der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
		Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
	</p>

	<h2>Haftung für Links</h2>
	<p>
		Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss
		haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die
		Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
		verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
		Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
		erkennbar.
	</p>
	<p>
		Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
		Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
		werden wir derartige Links umgehend entfernen.
	</p>

	<h2>Urheberrecht</h2>
	<p>
		Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
		deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
		Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
		jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten,
		nicht kommerziellen Gebrauch gestattet.
	</p>
	<p>
		Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
		Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
		Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
		entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
		umgehend entfernen.
	</p>

	<p>
		Quelle: <a
			rel="noreferrer noopener"
			href="https://www.erecht24.de/impressum-generator.html"
			target="_blank">https://www.e-recht24.de/</a
		>
	</p>
</div>

<style lang="postcss">
	h1 {
		@apply text-3xl mb-5;
	}

	h2 {
		@apply text-xl mb-3 mt-10;
	}

	h3 {
		@apply text-lg mb-3 mt-8;
	}

	p {
		@apply mb-3;
	}

	ul,
	ol {
		@apply pl-7 mb-4;
	}

	li {
		@apply pl-2;
	}

	ul li {
		@apply list-disc;
	}

	ol li {
		@apply list-decimal;
	}

	a:not(.no-underline) {
		@apply underline;
	}
</style>
