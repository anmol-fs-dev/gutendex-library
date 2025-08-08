export const LANG = 'en'

const STR = {
  en: {
    categories_title: 'Browse by Category',
    search_placeholder: 'Search by title or author...',
    loading: 'Loading…',
    error_fetch: 'Something went wrong while fetching books.',
    no_viewable: 'No viewable version available',
  },
  hi: {
    categories_title: 'श्रेणी द्वारा ब्राउज़ करें',
    search_placeholder: 'शीर्षक या लेखक से खोजें...',
    loading: 'लोड हो रहा है…',
    error_fetch: 'पुस्तकें प्राप्त करते समय कुछ गलत हुआ।',
    no_viewable: 'देखने योग्य संस्करण उपलब्ध नहीं है',
  }
}

export const t = (key) => {
  const dict = STR[LANG] || STR.en
  return dict[key] || key
}
