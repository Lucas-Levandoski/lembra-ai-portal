import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Load the locale
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);

// Update the locale to capitalize month and weekday names
dayjs.updateLocale('pt-br', {
  months: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthsShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  weekdays: [
    'Domingo', 'Segunda-feira', 'Terça-feira',
    'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  weekdaysMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Sx', 'Sa'],
});