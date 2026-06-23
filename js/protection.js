// Защита от копирования и скапирования контента
(function(){
  // Блокируем контекстное меню (правый клик)
  document.addEventListener('contextmenu', e => {
    if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  });

  // Блокируем Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+U, F12
  document.addEventListener('keydown', e => {
    if((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 'u' || e.key === 'C' || e.key === 'X' || e.key === 'A' || e.key === 'U')) {
      if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        return false;
      }
    }
    if(e.key === 'F12' || (e.ctrlKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'C')) {
      e.preventDefault();
      return false;
    }
  });

  // Блокируем выделение изображений
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', e => e.preventDefault());
    img.addEventListener('selectstart', e => e.preventDefault());
  });

  // Водяной знак на изображениях при попытке сохранить
  document.addEventListener('mousedown', e => {
    if(e.button === 2 && e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });

  // Защита от DevTools через проверку ширины/высоты окна
  const start = Date.now();
  setInterval(() => {
    if(window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
      document.body.innerHTML = '';
      return;
    }
    if(window.devtools && window.devtools.open) {
      document.body.innerHTML = '';
      return;
    }
  }, 500);
})();
