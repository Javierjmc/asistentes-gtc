import { create } from 'zustand';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import api from './api/client';

export const useStore = create((set) => ({
  // Estado para Reportes
  reports: [],

  // Estado para Clientes
  clients: [],
  clientForm: { nombre: '', empresa: '', asistentes: '' },
  editingClientIndex: null,
  searchQuery: '',

  // Estado para Asistentes
  asistentes: [],
  asistenteForm: { nombre: '', empresa: '', email: '' },
  editingAsistenteIndex: null,

  // Estado para Actividades (del formulario de reporte)
  actividades: [],
  actividadForm: { titulo: '', descripcion: '' },
  editingActividadId: null,

  // Estado para Objetivos (del formulario de reporte)
  goals: [],
  goalForm: { title: '', description: '' },
  editingGoalIndex: null,

  // Estado para Sugerencias (del formulario de reporte)
  sugerencias: [],
  sugerenciaForm: { texto: '' },
  editingSugerenciaIndex: null,

  // Estado para Métricas/Capturas de pantalla (del formulario de reporte)
  screenshots: [],

  // Estado de error para los formularios
  error: '',

  // Estado de carga y errores para las peticiones a la API
  isLoading: false,
  apiError: null,

  // --- ACCIONES DE GESTIÓN DE CLIENTES ---
  setClientForm: (form) => set({ clientForm: form }),
  setEditingClientIndex: (index) => set({ editingClientIndex: index }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  fetchClients: async () => {
    set({ isLoading: true, apiError: null });
    try {
      const response = await api.get('/clientes');
      set({ clients: response.data, isLoading: false });
    } catch (error) {
      set({ apiError: "Error al cargar los clientes.", isLoading: false });
    }
  },
  addClient: (client) => set((state) => ({
    clients: [...state.clients, { ...client, _id: Date.now().toString() }], // ID simulado
    clientForm: { nombre: '', empresa: '', asistentes: '' },
  })),
  updateClient: (index, client) => set((state) => ({
    clients: state.clients.map((item, i) => i === index ? { ...item, ...client } : item),
    clientForm: { nombre: '', empresa: '', asistentes: '' },
    editingClientIndex: null,
  })),
  removeClient: (index) => set((state) => ({
    clients: state.clients.filter((_, i) => i !== index),
  })),

  // --- ACCIONES DE GESTIÓN DE ASISTENTES ---
  setAsistenteForm: (form) => set({ asistenteForm: form }),
  setEditingAsistenteIndex: (index) => set({ editingAsistenteIndex: index }),
  fetchAsistentes: async () => {
    set({ isLoading: true, apiError: null });
    try {
      const response = await api.get('/asistentes');
      set({ asistentes: response.data, isLoading: false });
    } catch (error) {
      set({ apiError: "Error al cargar los asistentes.", isLoading: false });
    }
  },
  addAsistente: (asistente) => set((state) => ({
    asistentes: [...state.asistentes, { ...asistente, _id: Date.now().toString() }], // ID simulado
    asistenteForm: { nombre: '', empresa: '', email: '' },
  })),
  updateAsistente: (index, asistente) => set((state) => ({
    asistentes: state.asistentes.map((item, i) => i === index ? { ...item, ...asistente } : item),
    asistenteForm: { nombre: '', empresa: '', email: '' },
    editingAsistenteIndex: null,
  })),
  removeAsistente: (index) => set((state) => ({
    asistentes: state.asistentes.filter((_, i) => i !== index),
  })),

  // --- ACCIONES DE GESTIÓN DE REPORTES ---
  saveReport: async (newReport) => {
    try {
      // Incluir las URLs de las imágenes de Cloudinary en el reporte
      const reporteConImagenes = {
        ...newReport,
        metricas_imagenes: newReport.screenshots?.map(screenshot => ({
          url: screenshot.cloudinaryUrl,
          title: screenshot.title,
          public_id: screenshot.public_id
        })) || []
      };
      
      const response = await api.post('/reportes/', reporteConImagenes);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error al guardar el reporte:", error);
      return { success: false, error: "Error al guardar el reporte." };
    }
  },
  fetchReports: async () => {
    set({ isLoading: true, apiError: null });
    try {
      const response = await api.get('/reportes/');
      set({ reports: response.data, isLoading: false });
    } catch (error) {
      set({ apiError: "Error al cargar los reportes.", isLoading: false });
    }
  },
  approveReport: async (reporteId) => {
    try {
      await api.post(`/reportes/${reporteId}/aprobar`);
      set((state) => ({
        reports: state.reports.map((r) => r._id === reporteId ? { ...r, estado: 'aprobado' } : r)
      }));
      return { success: true };
    } catch (error) {
      console.error('Error al aprobar el reporte:', error);
      return { success: false, error: 'No se pudo aprobar el reporte.' };
    }
  },
  sendReport: async (reporteId) => {
    try {
      await api.post(`/reportes/${reporteId}/enviar`);
      set((state) => ({
        reports: state.reports.map((r) => r._id === reporteId ? { ...r, estado: 'enviado' } : r)
      }));
      return { success: true };
    } catch (error) {
      console.error('Error al enviar el reporte:', error);
      return { success: false, error: 'No se pudo enviar el reporte.' };
    }
  },
  setReportState: (reporteId, estado) => set((state) => {
    const updatedReports = state.reports.map((reporte) => {
      if (reporte._id === reporteId) {
        return { ...reporte, estado: estado };
      }
      return reporte;
    });
    return { reports: updatedReports };
  }),

  // --- ACCIONES DE LOS FORMULARIOS DE REPORTE ---
  // Actividades (id-based)
  setActividadForm: (form) => set({ actividadForm: form }),
  setEditingActividadId: (id) => set({ editingActividadId: id }),
  addActividad: (actividad) => set((state) => ({
    actividades: [...state.actividades, { ...actividad, id: uuidv4() }],
    actividadForm: { titulo: '', descripcion: '' },
    error: '',
  })),
  updateActividad: (id, actividad) => set((state) => ({
    actividades: state.actividades.map((item) => item.id === id ? { ...item, ...actividad } : item),
    actividadForm: { titulo: '', descripcion: '' },
    editingActividadId: null,
    error: '',
  })),
  removeActividad: (id) => set((state) => ({
    actividades: state.actividades.filter((item) => item.id !== id),
  })),
  setActividades: (actividades) => set({ actividades }),

  // Objetivos
  setGoalForm: (form) => set({ goalForm: form }),
  setEditingGoalIndex: (index) => set({ editingGoalIndex: index }),
  addGoal: (goal) => set((state) => ({
    goals: [...state.goals, goal],
    goalForm: { title: '', description: '' },
    error: '',
  })),
  updateGoal: (index, goal) => set((state) => ({
    goals: state.goals.map((item, i) => i === index ? goal : item),
    goalForm: { title: '', description: '' },
    editingGoalIndex: null,
    error: '',
  })),
  removeGoal: (index) => set((state) => ({
    goals: state.goals.filter((_, i) => i !== index),
  })),
  setGoals: (goals) => set({ goals }),

  // Sugerencias
  setSugerenciaForm: (form) => set({ sugerenciaForm: form }),
  setEditingSugerenciaIndex: (index) => set({ editingSugerenciaIndex: index }),
  addSugerencia: (sugerencia) => set((state) => ({
    sugerencias: [...state.sugerencias, sugerencia],
    sugerenciaForm: { texto: '' },
    error: '',
  })),
  updateSugerencia: (index, sugerencia) => set((state) => ({
    sugerencias: state.sugerencias.map((item, i) => i === index ? sugerencia : item),
    sugerenciaForm: { texto: '' },
    editingSugerenciaIndex: null,
    error: '',
  })),
  removeSugerencia: (index) => set((state) => ({
    sugerencias: state.sugerencias.filter((_, i) => i !== index),
  })),
  setSugerencias: (sugerencias) => set({ sugerencias }),

  // Métricas / Capturas de pantalla
  addScreenshots: (newScreenshots) => set((state) => ({
    screenshots: [...state.screenshots, ...newScreenshots],
  })),
  updateScreenshotTitle: (index, titleOrObject) => set((state) => ({
    screenshots: state.screenshots.map((item, i) =>
      i === index ? { ...item, ...(typeof titleOrObject === 'string' ? { title: titleOrObject } : titleOrObject) } : item
    ),
  })),
  removeScreenshot: (index) => set((state) => {
    const preview = state.screenshots[index]?.preview;
    if (typeof preview === 'string' && preview.startsWith('blob:')) {
      try { URL.revokeObjectURL(preview); } catch {}
    }
    return {
      screenshots: state.screenshots.filter((_, i) => i !== index),
    };
  }),
  setScreenshots: (screenshots) => set({ screenshots }),
  
  // Funciones para subir imágenes a Cloudinary
  uploadImageToCloudinary: async (file) => {
    set({ isLoading: true, apiError: null });
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      set({ isLoading: false });
      return { success: true, data: response.data };
    } catch (error) {
      set({ 
        isLoading: false, 
        apiError: "Error al subir la imagen." 
      });
      return { success: false, error: "Error al subir la imagen." };
    }
  },

  // Limpiar todos los formularios
  resetForms: () => set({
    actividades: [],
    actividadForm: { titulo: '', descripcion: '' },
    editingActividadId: null,
    goals: [],
    goalForm: { title: '', description: '' },
    editingGoalIndex: null,
    sugerencias: [],
    sugerenciaForm: { texto: '' },
    editingSugerenciaIndex: null,
    screenshots: [],
    error: '',
  }),
  setError: (message) => set({ error: message }),
}));