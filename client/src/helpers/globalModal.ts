import GlobalModal from '@/components/GlobalModal';

export const createGlobalModal = (
  content: string,
  sumbitCallback: () => void,
) => {
  const globalModal = new GlobalModal(content, sumbitCallback);
  globalModal.addBody();
  globalModal.registerEventListener();
};
