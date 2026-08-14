/* ==========================================================================
   IMPRIME TODO — comportamiento de la página
   Sin dependencias. Cuatro piezas: menú móvil, acordeón de servicios,
   filtro de portafolio y validación del formulario de cotización.
   ========================================================================== */
(function () {
  'use strict';

  /* ── Menú móvil ───────────────────────────────────────────────────────── */
  var toggle = document.getElementById('nav-toggle');
  var menu   = document.getElementById('nav-menu');
  var desktop = window.matchMedia('(min-width: 64em)');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Al tocar un enlace el menú se cierra solo, si no tapa la sección destino.
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a') && !desktop.matches) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // En escritorio el menú siempre está visible: se limpia el estado del botón.
  desktop.addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  /* ── Acordeón de servicios ────────────────────────────────────────────── */
  document.querySelectorAll('.acc__head').forEach(function (head) {
    head.addEventListener('click', function () {
      var open  = head.getAttribute('aria-expanded') === 'true';
      var panel = head.nextElementSibling;

      // Sólo una categoría abierta a la vez: en móvil evita el scroll infinito.
      document.querySelectorAll('.acc__head[aria-expanded="true"]').forEach(function (other) {
        if (other !== head) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.hidden = true;
        }
      });

      head.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  });

  /* ── Filtro de portafolio ─────────────────────────────────────────────── */
  var chips = document.querySelectorAll('.chip');
  var items = document.querySelectorAll('#work-grid .work__item');
  var empty = document.getElementById('work-empty');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.dataset.filter;
      var shown  = 0;

      chips.forEach(function (other) {
        var active = other === chip;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });

      items.forEach(function (item) {
        var match = filter === 'all' || item.dataset.cat === filter;
        item.hidden = !match;
        if (match) shown++;
      });

      empty.hidden = shown > 0;
    });
  });

  /* ── Formulario de cotización ─────────────────────────────────────────── */
  var form   = document.getElementById('quote-form');
  var status = document.getElementById('form-status');
  var MAX_MB = 25;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var invalid = null;

    form.querySelectorAll('[required]').forEach(function (field) {
      var ok = field.checkValidity() && field.value.trim() !== '';
      field.setAttribute('aria-invalid', String(!ok));
      if (!ok && !invalid) invalid = field;
    });

    var file = document.getElementById('f-file').files[0];
    if (file && file.size > MAX_MB * 1024 * 1024) {
      status.textContent = 'El archivo pesa más de ' + MAX_MB + ' MB. Mándalo por WhatsApp o por correo.';
      return;
    }

    if (invalid) {
      status.textContent = 'Falta completar algún campo obligatorio.';
      invalid.focus();
      return;
    }

    // Demostración: no hay backend conectado. Al montar el sitio de un cliente
    // aquí va el fetch() al endpoint que reciba la cotización.
    status.textContent = 'Gracias, recibimos tu solicitud. Te respondemos en menos de 24 horas hábiles.';
    form.reset();
  });
})();
