import VPviewer from './components/VPviewer.vue';
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(VPviewer.name, VPviewer);
}
export default VPviewer;
