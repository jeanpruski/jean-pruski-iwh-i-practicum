require('dotenv').config();
const axios = require('axios');

const hubspot_service = {
  hubspotHeaders: {
    headers: {
      'Authorization': `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
      'Content-Type': 'application/json'
    }
  },
  getObjects: async (objectId) => {
    const url = `https://api.hubapi.com/crm/v3/objects/${objectId}?limit=100&archived=false&properties=name&properties=first_skill&properties=secondary_skill`;

    try {
      const response = await axios.get(url, hubspot_service.hubspotHeaders);
      return response.data.results;
    } catch (error) {
      return;
    }
  },
  updateObjects: async (objectId, formData) => {
    const url = `https://api.hubapi.com/crm/v3/objects/${objectId}`;

    try {
      const item = {
          properties: {
              "name": formData.name,
              "first_skill": formData.first_skill,
              "secondary_skill": formData.secondary_skill
          }
      };
     
      await axios.post(url, item, hubspot_service.hubspotHeaders);
      return {
        result: true
      }
    } catch (error) {
      return {
        result: false,
        error
      }
    }
  }
}

module.exports = hubspot_service;