const selectors = {
  emberPowerSelectTrigger: '.ember-power-select-trigger',
  emberPowerSelectOption: '.ember-power-select-option',
  createNewAgendaButton: '[data-test-vlc-agenda-createnewagendabutton]',
  datepickerButton: '[data-test-vlc-vl-datepickerButton]',
  flatpickrCalendar: '.flatpickr-calendar',
  flatpickrMonthDropdownMonths: '.open  .flatpickr-monthDropdown-months',
  numInputWrapper: '.open  .numInputWrapper',
  inputNumInputCurYear: '.open  input.numInput.cur-year',
  flatpickrDay: '.open  .flatpickr-day',
  button: 'button',
  overviewTitle: '[data-test-agendas-title]',
  agendaItemKortBestekTab: '[data-test-agenda-agendaitem-tab="agendaitem-bestek"]',
  agendaItemOpmerkingenTab: '[data-test-agenda-agendaitem-tab="agendaitem-comment"]',
  agendaItemDocumentsTab: '[data-test-agenda-agendaitem-tab="documents"]',
  agendaItemDossierTab: '[data-test-agenda-agendaitem-tab="agendaitem-case"]',
  navigateToPrintableAgenda: '[data-test-agenda-header-navigateToPrintableAgenda]',
  printContainer: '[data-test-agenda-printContainer]',
  printHeaderTitle: '[data-test-agenda-print-header-title]',
  pillContainer: '.pill-container',
  dataTable: '.vl-data-table',
  dataTableZebra: '.vl-data-table--zebra',
  toProcedureStapLink: '.vlc-panel-layout__main-content a',
  confidentialityIcon: '[data-test-icon-agenda-confidentiality-locked]',
  subcase: {
    agendaLink: '[data-test-subcase-agenda-link] a',
    confidentialyCheck: '[data-test-vl-subcase-titles-edit-confidentiality] input',
  },
  item: {
    editLink: '[data-test-agendaitem-edit-link] a',
    checkBoxLabel: 'label.vl-checkbox--switch__label',
    actionButton: '.vl-action-group button',
    themes: '[data-test-agenda-news-item-themes]',
    news: {
      editLink: '[data-test-agenda-news-item-view] [data-test-newsletter-edit]',
      saveButton: '[data-test-newsletter-edit-save]',
      checkedThemes: '[data-test-themes-selector] input:checked',
      themesSelector: '[data-agenda-item-news-edit] [data-test-themes-selector]',
    },
  },
  agendaActions: '[data-test-agenda-header-showActionOptions]',
  approveAgenda: '[data-test-agenda-header-approveAgenda]',
  lockAgenda: '[data-test-agenda-header-lockagenda]',
  agendaItemDecisionTab: '[data-test-agenda-agendaitem-tab="agendaitem-decision"]',
  addDecision: '[data-test-add-decision]',
  decisionContainer: '[data-test-decision-container]',
  deleteDecision: '[data-test-delete-decision]',
  uploadDecisionFile: '[data-test-upload-decision-file]',
  accessLevelPill: '[data-test-access-level-pill]',
  accessLevelSave: '[data-test-access-level-save]',

  subcaseTitlesEdit: '[data-test-subcase-titles-edit]',
  subcaseTitlesEditTitle: '[data-test-subcase-titles-edit-title]',
  subcaseTitlesEditShorttitle: '[data-test-subcase-titles-edit-shorttitle]',
  subcaseTitlesEditAccessLevel: '[data-test-subcase-titles-edit-accessLevel]',
  subcaseTitlesEditConfidential: '[data-test-subcase-titles-edit-confidential ]',
  subcaseTitlesEditSave: '[data-test-subcase-titles-edit-save]',

  agendaitemTitlesEdit: '[data-test-agendaitem-titles-edit]',
  agendaitemTitlesEditTitle: '[data-test-agendaitem-titles-edit-title]',
  agendaitemTitlesEditShorttitle: '[data-test-agendaitem-titles-edit-shorttitle]',
  agendaitemTitlesEditExplanation: '[data-test-agendaitem-titles-edit-explanation]',
  agendaitemTitlesEditShowInNewsletter: '[data-test-agendaitem-titles-edit-showInNewsletter]',
  agendaitemTitlesEditSave: '[data-test-agendaitem-titles-edit-save]',
  agendaitemTitlesEditConfidential: '[data-test-agendaitem-titles-edit-confidential]',

  approveDesignAgenda: '[data-test-approve-design-agenda]',
  subcaseDocumentsEdit: '[data-test-subcase-documents-edit]',
  documentType: '[data-test-document-type]',
  documentAccessLevel: '[data-test-document-accesslevel]',
  agendaDetailSidebarSubitem: '[data-test-agenda-detail-sidebar-sub-item]',
  agendaOverviewSubitem: '[data-test-agenda-overview-sub-item]',
  agendaitemTitelsConfidential: '[data-test-agenda-subcase-confidential]',
  agendaHeaderShowAgendaOptions: '[data-test-agenda-header-showAgendaOptions]',
  agendaHeaderApproveAndCloseAgenda: '[data-test-agenda-header-approve-and-close-agenda]',
};
export default selectors;
