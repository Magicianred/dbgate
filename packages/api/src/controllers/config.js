module.exports = {
  get_meta: 'get',
  async get() {
    const toolbarButtons = process.env.TOOLBAR;
    const toolbar = toolbarButtons
      ? toolbarButtons.split(',').map((name) => ({
          name,
          icon: process.env[`ICON_${name}`],
          title: process.env[`TITLE_${name}`],
          page: process.env[`PAGE_${name}`],
        }))
      : null;
    const startupPages = process.env.STARTUP_PAGES ? process.env.STARTUP_PAGES.split(',') : [];
    return {
      runAsPortal: !!process.env.CONNECTIONS,
      toolbar,
      startupPages,
      singleDatabase:
        process.env.SINGLE_CONNECTION && process.env.SINGLE_DATABASE
          ? {
              conid: process.env.SINGLE_CONNECTION,
              database: process.env.SINGLE_DATABASE,
            }
          : null,
    };
  },
};
