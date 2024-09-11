// Inizializzazione di Vue
new Vue({
    el: '#app',
    data: {
        emails: [], // Array per memorizzare gli indirizzi email
        allEmailsGenerated: false // Stato per controllare se tutte le email sono state generate
    },
    mounted() {
        this.generateEmails(); // Richiama il metodo quando il componente è montato
    },
    methods: {
        async generateEmails() {
            const emailPromises = [];
            for (let i = 0; i < 10; i++) {
                emailPromises.push(
                    axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
                        .then(response => {
                            console.log('Email ricevuta:', response.data.response); // Log dell'email ricevuta
                            return response.data.response;
                        })
                        .catch(error => {
                            console.error('Errore nel recupero dell\'email:', error); // Log di eventuali errori
                        })
                );
            }
            // Risolvi tutte le promesse e memorizza le email
            this.emails = await Promise.all(emailPromises);
            console.log('Tutte le email:', this.emails); // Verifica che l'array sia popolato correttamente
            this.allEmailsGenerated = true; // Mostra la lista quando tutte le email sono generate
        }
    }
});