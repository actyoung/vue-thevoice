import { defineStore } from 'pinia';
import axios from 'axios';

export const useVideoStore = defineStore('videoStore', {
  state: () => ({
    videos: []
  }),
  actions: {
    async fetchVideos() {
      try {
        const response = await axios.get('/videos.json');
        this.videos = response.data;
      } catch (error) {
        console.error('Error loading videos:', error);
      }
    }
  },
  getters: {
    getVideoById: (state) => (id) => {
      return state.videos.find(video => video.id === parseInt(id));
    }
  }
});