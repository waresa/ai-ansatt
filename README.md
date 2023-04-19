# ai-ansatt

- Wrapper for OpenAI sin API

- Kan velge spesefike roller for AI-en slik at svarene blir bedre.
- Brukeren kan også laste opp en fil og spør om filen. 

- Bruke embeddings til å embedde filen og brukeren sitt query. Sammenligner de via å bruke cosine similarity og sende de 10 beste resultatene til GPT-3.5-turbo for å svare brukeren.
