const modelSelect = document.getElementById('truck-model');
const modSelect = document.getElementById('truck-mod');
const previewImg = document.getElementById('truck-preview');

// Variável para guardar os dados da nossa API depois de carregar
let truckApiData = {};

// Função para buscar os dados da API JSON
async function carregarAPI() {
    try {
        // CORREÇÃO: Nome do arquivo alterado para link.json
        const resposta = await fetch('link.json');
        
        if (!resposta.ok) {
            throw new Error('Erro ao carregar a API de imagens');
        }
        
        truckApiData = await resposta.json();
        
        // Assim que a API carregar, atualiza a imagem inicial na tela
        updatePreview();
        
    } catch (erro) {
        console.error("Falha na API:", erro);
    }
}

// Função para atualizar a imagem baseada na seleção
function updatePreview() {
    // Só tenta trocar se a API já tiver carregado os dados
    if (Object.keys(truckApiData).length === 0) return;

    const model = modelSelect.value;
    const mod = modSelect.value;
    
    previewImg.classList.add('fade-out');
    
    setTimeout(() => {
        // Busca a URL correta dentro dos dados da API
        if(truckApiData[model] && truckApiData[model][mod]) {
            previewImg.src = truckApiData[model][mod];
        } else {
            // CORREÇÃO: Caminho da pasta padronizado para "Imagens"
            previewImg.src = "Imagens/f250_brasil_texas.jpg";
        }
        previewImg.classList.remove('fade-out');
    }, 400); 
}

// Escuta as mudanças nas opções escolhidas
modelSelect.addEventListener('change', updatePreview);
modSelect.addEventListener('change', updatePreview);

// Inicia o processo carregando a API
carregarAPI();