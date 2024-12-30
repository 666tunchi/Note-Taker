import apiClient from "./apiClient";

export const getNotes = async () => {
    try {
      const response = await apiClient.get('/');
      const data = await response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  };

  export const getActiveNotes = async () => {
    try {
      const response = await apiClient.get('/active');
      const data = await response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  };

  export const getArchivedNotes = async () => {
    try {
      const response = await apiClient.get('/archived');
      const data = await response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  };

export const saveNotes = async (note) => {
    try {
        const response = await apiClient.post('/create', note);
        console.log(response.data);
    } catch (error) {
        console.error("No se pudo guardar la norta", error);
    }
}

export const updateNotes = async (note, id) => {
    try {
        const response = await apiClient.put(`/update/${id}`, note);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("No se encontraron nota para actualizar", error);
    }
}

export const deleteNotes = async (id) => {
    try {
        const response = await apiClient.delete(`/delete/${id}`);
        console.log(response.data);
    } catch (error) {
        console.error("No se encontraron nota para eliminar", error);
    }
}


