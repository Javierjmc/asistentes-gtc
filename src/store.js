import { create } from 'zustand';

export const useStore = create((set) => ({




  // Estado para Clientes
  clients: [],
  clientForm: { nombre: '', empresa: '', asistentes: '' },
  editingClientIndex: null,
  searchQuery: '',

  // Acciones para Clientes
  setClientForm: (form) => set({ clientForm: form }),
  setEditingClientIndex: (index) => set({ editingClientIndex: index }),
  addClient: (client) => set((state) => {
    // Añadir los asistentes del nuevo cliente a la lista global de asistentes
    const newAsistentes = client.asistentes.map(nombre => ({ nombre, empresa: client.empresa, email: '' }));
    return {
      clients: [...state.clients, { nombre: client.nombre, empresa: client.empresa }],
      asistentes: [...state.asistentes, ...newAsistentes],
      error: '',
    };
  }),
  updateClient: (index, client) => set((state) => {
    // Eliminar los asistentes de la empresa original antes de añadir los nuevos
    const oldEmpresa = state.clients[index].empresa;
    const updatedAsistentes = state.asistentes.filter(asistente => asistente.empresa !== oldEmpresa);
    
    // Crear y añadir los nuevos asistentes del cliente editado a la lista global
    const newAsistentes = client.asistentes.map(nombre => ({ nombre, empresa: client.empresa, email: '' }));

    return {
      clients: state.clients.map((item, i) => i === index ? { nombre: client.nombre, empresa: client.empresa } : item),
      asistentes: [...updatedAsistentes, ...newAsistentes],
      editingClientIndex: null,
      clientForm: { nombre: '', empresa: '', asistentes: '' },
      error: '',
    };
  }),
  removeClient: (index) => set((state) => {
    // Eliminar el cliente y sus asistentes asociados
    const empresa = state.clients[index].empresa;
    return {
      clients: state.clients.filter((_, i) => i !== index),
      asistentes: state.asistentes.filter(asistente => asistente.empresa !== empresa),
    };
  }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Estado para Asistentes
  asistentes: [],
  asistenteForm: { nombre: '', empresa: '', email: '' },
  editingAsistenteIndex: null,

  // Acciones para Asistentes
  setAsistenteForm: (form) => set({ asistenteForm: form }),
  setEditingAsistenteIndex: (index) => set({ editingAsistenteIndex: index }),
  addAsistente: (asistente) => set((state) => ({
    asistentes: [...state.asistentes, asistente],
  })),
  updateAsistente: (index, asistente) => set((state) => ({
    asistentes: state.asistentes.map((item, i) => i === index ? asistente : item),
    editingAsistenteIndex: null,
  })),
  removeAsistente: (index) => set((state) => ({
    asistentes: state.asistentes.filter((_, i) => i !== index),
  })),






  // Estado para Actividades
  actividades: [],
  actividadForm: { titulo: '', descripcion: '' },
  editingActividadIndex: null,

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

  // Estado para Objetivos
  goals: [],
  goalForm: { title: '', description: '' },
  editingGoalIndex: null,

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

  // Estado para Sugerencias
  sugerencias: [],
  sugerenciaForm: { texto: '' },
  editingSugerenciaIndex: null,

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

  // Estado para Métricas
  screenshots: [],
  
  // Acciones para Métricas
  addScreenshots: (newScreenshots) => set((state) => ({
    screenshots: [...state.screenshots, ...newScreenshots],
  })),
  removeScreenshot: (index) => set((state) => {
    // Revocar URL para liberar memoria antes de eliminar
    URL.revokeObjectURL(state.screenshots[index].preview);
    return {
      screenshots: state.screenshots.filter((_, i) => i !== index),
    };
  }),
  updateScreenshotTitle: (index, newTitle) => set((state) => ({
    screenshots: state.screenshots.map((screenshot, i) => 
      i === index ? { ...screenshot, title: newTitle } : screenshot
    ),
  })),

  // Estado y acciones para errores (compartido entre todos)
  error: '',
  setError: (message) => set({ error: message }),
}));