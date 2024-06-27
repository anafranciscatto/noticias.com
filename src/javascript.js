const apiKey = '48775c4a052a4c36bd6417e0f6a0d511'; 
const newsContainer = document.getElementById('news-container');
const categorySelect = document.getElementById('category');

/*
    Função assíncrona para buscar notícias da API com base na categoria selecionada
*/
async function fetchNews() {
    const category = categorySelect.value; // Obtém a categoria selecionada pelo usuário

    try {
        // Faz a requisição à API da News API
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`);
        
        // Converte a resposta da API em formato JSON
        const data = await response.json();

        // Verifica se a resposta contém artigos antes de tentar exibi-los
        if (data.articles) {
            // Chama a função para exibir as notícias na página HTML
            displayNews(data.articles);
        } else {
            console.error('Nenhum artigo encontrado');
        }
    } catch (error) {
        // Captura e exibe erros no console, caso ocorram
        console.error('Erro ao buscar notícias:', error);
    }
}

/*
    Função para exibir os artigos de notícia na página HTML
*/
function displayNews(articles) {
    newsContainer.innerHTML = ''; // Limpa o conteúdo atual do contêiner de notícias

    // Itera sobre o array de artigos de notícia
    articles.forEach(article => {
        const newsArticle = document.createElement('div'); // Cria um elemento <div> para cada artigo
        newsArticle.className = 'news-article'; // Define a classe CSS para estilização

        // Define o conteúdo HTML para cada artigo de notícia
        newsArticle.innerHTML = `
            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News Image">` : ''}
            <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
            <p>${article.description ? article.description : 'No description available.'}</p>
            <p><small>By ${article.author ? article.author : 'Unknown'} | ${new Date(article.publishedAt).toLocaleDateString()}</small></p>
        `;

        // Adiciona o artigo de notícia ao contêiner na página HTML
        newsContainer.appendChild(newsArticle);
    });
}

// Inicializa a busca de notícias ao carregar a página
fetchNews();
