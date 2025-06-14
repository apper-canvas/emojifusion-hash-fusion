import emojiProjectsData from '@/services/mockData/emojiProjects.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class EmojiProjectService {
  constructor() {
    this.data = [...emojiProjectsData];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const project = this.data.find(item => item.id === id);
    return project ? { ...project } : null;
  }

  async create(projectData) {
    await delay(400);
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    this.data.unshift(newProject);
    return { ...newProject };
  }

  async update(id, updateData) {
    await delay(300);
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updateData };
      return { ...this.data[index] };
    }
    throw new Error('Project not found');
  }

  async delete(id) {
    await delay(250);
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    }
    throw new Error('Project not found');
  }

  async generateVariants(inputData, inputType) {
    await delay(2000); // Simulate AI processing time
    
    // Generate mock variants based on input type
    const baseVariants = [
      {
        id: `variant_${Date.now()}_1`,
        mood: 'happy',
        colors: { primary: '#FFE66D', secondary: '#FF6B6B' },
        isAnimated: false,
        imageData: this.generateMockImageData(inputType, 'happy')
      },
      {
        id: `variant_${Date.now()}_2`,
        mood: 'excited',
        colors: { primary: '#4ECDC4', secondary: '#FFE66D' },
        isAnimated: true,
        imageData: this.generateMockImageData(inputType, 'excited')
      },
      {
        id: `variant_${Date.now()}_3`,
        mood: 'cool',
        colors: { primary: '#339AF0', secondary: '#4ECDC4' },
        isAnimated: false,
        imageData: this.generateMockImageData(inputType, 'cool')
      },
      {
        id: `variant_${Date.now()}_4`,
        mood: 'love',
        colors: { primary: '#FF6B6B', secondary: '#FFE66D' },
        isAnimated: true,
        imageData: this.generateMockImageData(inputType, 'love')
      },
      {
        id: `variant_${Date.now()}_5`,
        mood: 'surprised',
        colors: { primary: '#FFD93D', secondary: '#FF6B6B' },
        isAnimated: false,
        imageData: this.generateMockImageData(inputType, 'surprised')
      },
      {
        id: `variant_${Date.now()}_6`,
        mood: 'chill',
        colors: { primary: '#51CF66', secondary: '#4ECDC4' },
        isAnimated: false,
        imageData: this.generateMockImageData(inputType, 'chill')
      }
    ];

    return baseVariants.slice(0, Math.floor(Math.random() * 3) + 4); // Return 4-6 variants
  }

  generateMockImageData(inputType, mood) {
    // In a real app, this would be actual image data from AI generation
    return `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiNGRkU2NkQiLz4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iNCIgZmlsbD0iIzMzMzMzMyIvPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjI0IiByPSI0IiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik0yMCA0NEMyMCA0NCAyNCA0OCAzMiA0OEMzOCA0OCA0MiA0NCA0MiA0NCIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K`;
  }
}

export default new EmojiProjectService();