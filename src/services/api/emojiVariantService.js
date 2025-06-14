import emojiVariantsData from '@/services/mockData/emojiVariants.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class EmojiVariantService {
  constructor() {
    this.data = [...emojiVariantsData];
  }

  async getAll() {
    await delay(200);
    return [...this.data];
  }

  async getById(id) {
    await delay(150);
    const variant = this.data.find(item => item.id === id);
    return variant ? { ...variant } : null;
  }

  async create(variantData) {
    await delay(300);
    const newVariant = {
      ...variantData,
      id: Date.now().toString()
    };
    this.data.push(newVariant);
    return { ...newVariant };
  }

  async update(id, updateData) {
    await delay(250);
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updateData };
      return { ...this.data[index] };
    }
    throw new Error('Variant not found');
  }

  async delete(id) {
    await delay(200);
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    }
    throw new Error('Variant not found');
  }

  async customizeVariant(variantId, customizations) {
    await delay(500);
    const variant = this.data.find(item => item.id === variantId);
    if (variant) {
      const customizedVariant = {
        ...variant,
        colors: { ...variant.colors, ...customizations.colors },
        mood: customizations.mood || variant.mood,
        skinTone: customizations.skinTone || variant.skinTone,
        theme: customizations.theme || variant.theme
      };
      return { ...customizedVariant };
    }
    throw new Error('Variant not found');
  }
}

export default new EmojiVariantService();