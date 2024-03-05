import axios from "axios";

/**
 * Serviço HTTP para fazer requisições RESTful utilizando Axios.
 * @param {string} baseURL - URL base para as requisições.
 * @returns {Object} - Objeto contendo métodos para fazer requisições HTTP.
 */
export const HttpService = (baseURL) => {
  const httpClient = axios.create({
    baseURL,
  });

  return {
    /**
     * Faz uma requisição HTTP.
     * @param {string} endpoint - O endpoint da requisição.
     * @param {string} method - O método HTTP da requisição (GET, POST, PUT, DELETE).
     * @param {Object} data - Os dados a serem enviados na requisição.
     * @param {string} contentType - O tipo de conteúdo da requisição.
     * @returns {Promise} - Uma Promise contendo os dados da resposta da requisição.
     */
    async request(endpoint, method = "GET", data = null, contentType = "application/json") {
      const config = {
        method,
        url: endpoint,
        data,
        headers: {
          "Content-Type": contentType,
        },
      };

      try {
        const response = await httpClient(config);
        return response.data;
      } catch (error) {
        console.error("Error in request:", error);
        throw error;
      }
    },

    /**
     * Faz uma requisição HTTP utilizando o método GET.
     * @param {string} endpoint - O endpoint da requisição.
     * @param {Object} params - Os parâmetros da requisição.
     * @returns {Promise} - Uma Promise contendo os dados da resposta da requisição.
     */
    async get(endpoint, params = {}) {
      return this.request(endpoint, "GET", { params });
    },

    /**
     * Faz uma requisição HTTP utilizando o método POST.
     * @param {string} endpoint - O endpoint da requisição.
     * @param {Object} data - Os dados a serem enviados na requisição.
     * @param {string} contentType - O tipo de conteúdo da requisição.
     * @returns {Promise} - Uma Promise contendo os dados da resposta da requisição.
     */
    async post(endpoint, data, contentType) {
      return this.request(endpoint, "POST", data, contentType);
    },

    /**
     * Faz uma requisição HTTP utilizando o método PUT.
     * @param {string} endpoint - O endpoint da requisição.
     * @param {Object} data - Os dados a serem enviados na requisição.
     * @returns {Promise} - Uma Promise contendo os dados da resposta da requisição.
     */
    async put(endpoint, data) {
      return this.request(endpoint, "PUT", data);
    },

    /**
     * Faz uma requisição HTTP utilizando o método DELETE.
     * @param {string} endpoint - O endpoint da requisição.
     * @returns {Promise} - Uma Promise contendo os dados da resposta da requisição.
     */
    async delete(endpoint) {
      return this.request(endpoint, "DELETE");
    },
  };
};
