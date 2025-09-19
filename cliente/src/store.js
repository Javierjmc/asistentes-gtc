import { create } from 'zustand';

// Función para inicializar el estado con datos del localStorage
const getInitialReports = () => {
  try {
    const serializedReports = localStorage.getItem('reports');
    return serializedReports ? JSON.parse(serializedReports) : [];
  } catch (e) {
    console.error("Error al cargar los informes desde localStorage", e);
    return [];
  }
};

const saveReportsToLocalStorage = (reports) => {
  try {
    const serializedReports = JSON.stringify(reports);
    localStorage.setItem('reports', serializedReports);
  } catch (e) {
    console.error("Error al guardar los informes en localStorage", e);
  }
};

export const useStore = create((set) => ({
  // Estado para Clientes
  clients: [],
  clientForm: { nombre: '', empresa: '', asistentes: '' },
  editingClientIndex: null,
  searchQuery: '',

  // Estado para Asistentes
  asistentes: [],
  asistenteForm: { nombre: '', empresa: '', email: '' },
  editingAsistenteIndex: null,

  // Estado para Reportes (ahora persistente)
  reports: getInitialReports(),

  // Estado para Actividades
  actividades: [],
  actividadForm: { titulo: '', descripcion: '' },
  editingActividadIndex: null,
  error: '',

  // Estado para Objetivos
  goals: [],
  goalForm: { title: '', description: '' },
  editingGoalIndex: null,

  // Estado para Sugerencias
  sugerencias: [],
  sugerenciaForm: { texto: '' },
  editingSugerenciaIndex: null,

  // Estado para Métricas
  screenshots: [],

  // Acciones para Clientes
  setClientForm: (form) => set({ clientForm: form }),
  setEditingClientIndex: (index) => set({ editingClientIndex: index }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addClient: (client) => set((state) => {
    const newAsistentes = client.asistentes.map(nombre => ({ nombre, empresa: client.empresa, email: '' }));
    return {
      clients: [...state.clients, { nombre: client.nombre, empresa: client.empresa }],
      asistentes: [...state.asistentes, ...newAsistentes],
      error: '',
    };
  }),
  updateClient: (index, client) => set((state) => {
    const oldEmpresa = state.clients[index].empresa;
    const updatedAsistentes = state.asistentes.filter(asistente => asistente.empresa !== oldEmpresa);
    
    const newAsistentes = client.asistentes.map(nombre => ({ nombre, empresa: client.empresa, email: '' }));
    
    return {
      clients: state.clients.map((item, i) => i === index ? { nombre: client.nombre, empresa: client.empresa } : item),
      asistentes: [...updatedAsistentes, ...newAsistentes],
      error: '',
    };
  }),
  removeClient: (index) => set((state) => {
    const empresaToRemove = state.clients[index].empresa;
    return {
      clients: state.clients.filter((_, i) => i !== index),
      asistentes: state.asistentes.filter(asistente => asistente.empresa !== empresaToRemove),
    };
  }),

  // Acciones para Asistentes
  setAsistenteForm: (form) => set({ asistenteForm: form }),
  setEditingAsistenteIndex: (index) => set({ editingAsistenteIndex: index }),
  addAsistente: (asistente) => set((state) => ({
    asistentes: [...state.asistentes, asistente],
  })),
  updateAsistente: (index, asistente) => set((state) => ({
    asistentes: state.asistentes.map((item, i) => i === index ? asistente : item),
  })),
  removeAsistente: (index) => set((state) => ({
    asistentes: state.asistentes.filter((_, i) => i !== index),
  })),

  // Acciones para Reportes (ahora persistente)
  saveReport: (report) => set((state) => {
    const newReports = [...state.reports, report];
    saveReportsToLocalStorage(newReports);
    return { reports: newReports };
  }),
  
  // Acciones para Actividades
  setActividadForm: (form) => set({ actividadForm: form }),
  setEditingActividadIndex: (index) => set({ editingActividadIndex: index }),
  addActividad: (actividad) => set((state) => ({
    actividades: [...state.actividades, actividad],
    actividadForm: { titulo: '', descripcion: '' },
    error: '',
  })),
  updateActividad: (index, actividad) => set((state) => ({
    actividades: state.actividades.map((item, i) => i === index ? actividad : item),
    actividadForm: { titulo: '', descripcion: '' },
    editingActividadIndex: null,
    error: '',
  })),
  removeActividad: (index) => set((state) => ({
    actividades: state.actividades.filter((_, i) => i !== index),
  })),
  setError: (message) => set({ error: message }),

  // Acciones para Objetivos
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

  // Acciones para Sugerencias
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

  // Acciones para Métricas
  addScreenshots: (newScreenshots) => set((state) => ({
    screenshots: [...state.screenshots, ...newScreenshots],
  })),
  updateScreenshotTitle: (index, title) => set((state) => ({
    screenshots: state.screenshots.map((item, i) =>
      i === index ? { ...item, title } : item
    ),
  })),
  removeScreenshot: (index) => set((state) => {
    URL.revokeObjectURL(state.screenshots[index].preview);
    return {
      screenshots: state.screenshots.filter((_, i) => i !== index),
    };
  }),

  // Acciones para limpiar los formularios del asistente
  resetForms: () => set({
    actividades: [],
    goals: [],
    sugerencias: [],
    screenshots: [],
    actividadForm: { titulo: '', descripcion: '' },
    goalForm: { title: '', description: '' },
    sugerenciaForm: { texto: '' },
    error: '',
  }),
}));