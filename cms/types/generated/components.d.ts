import type { Schema, Struct } from '@strapi/strapi';

export interface MenuKnopka extends Struct.ComponentSchema {
  collectionName: 'components_menu_knopka';
  info: {
    description: '';
    displayName: '\u041A\u043D\u043E\u043F\u043A\u0430';
    icon: 'cursor';
  };
  attributes: {
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary']>;
    url: Schema.Attribute.String;
  };
}

export interface MenuLogo extends Struct.ComponentSchema {
  collectionName: 'components_menu_logos';
  info: {
    description: '';
    displayName: '\u041B\u043E\u0433\u043E\u0442\u0438\u043F';
    icon: 'command';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
  };
}

export interface MenuPunktMenyu extends Struct.ComponentSchema {
  collectionName: 'components_menu_punkt_menyu';
  info: {
    displayName: '\u041F\u0443\u043D\u043A\u0442 \u043C\u0435\u043D\u044E';
    icon: 'cursor';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface MenuSsylka extends Struct.ComponentSchema {
  collectionName: 'components_menu_ssylka';
  info: {
    description: '';
    displayName: '\u0421\u0441\u044B\u043B\u043A\u0430';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface MenuTekst extends Struct.ComponentSchema {
  collectionName: 'components_menu_tekst';
  info: {
    displayName: '\u0422\u0435\u043A\u0441\u0442';
    icon: 'pencil';
  };
  attributes: {
    text: Schema.Attribute.Blocks;
  };
}

export interface MenuVypadayushheeMenyu extends Struct.ComponentSchema {
  collectionName: 'components_menu_vypadayushhee_menyu';
  info: {
    displayName: '\u0412\u044B\u043F\u0430\u0434\u0430\u044E\u0449\u0435\u0435 \u043C\u0435\u043D\u044E';
    icon: 'bulletList';
  };
  attributes: {
    sections: Schema.Attribute.Relation<'oneToMany', 'api::section.section'>;
    title: Schema.Attribute.String;
  };
}

export interface PageBlokKontakty extends Struct.ComponentSchema {
  collectionName: 'components_page_blok_kontakty';
  info: {
    displayName: '\u0411\u043B\u043E\u043A: \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B';
    icon: 'phone';
  };
  attributes: {
    address: Schema.Attribute.String & Schema.Attribute.Required;
    addressIcon: Schema.Attribute.Media<'images'>;
    coordinates: Schema.Attribute.JSON & Schema.Attribute.Required;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    emailIcon: Schema.Attribute.Media<'images'>;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    mapDescription: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u0418\u0440\u043A\u0443\u0442\u0441\u043A\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0433.\u0411\u0440\u0430\u0442\u0441\u043A'>;
    mapName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u0411\u0430\u0437\u0430 \u043E\u0442\u0434\u044B\u0445\u0430 \u0421\u043E\u0431\u043E\u043B\u0435\u043A'>;
    phone1: Schema.Attribute.String & Schema.Attribute.Required;
    phone2: Schema.Attribute.String;
    phoneIcon: Schema.Attribute.Media<'images'>;
  };
}

export interface PageBlokObratnayaSvyaz extends Struct.ComponentSchema {
  collectionName: 'components_page_blok_obratnaya_svyaz';
  info: {
    displayName: '\u0411\u043B\u043E\u043A: \u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C';
    icon: 'envelop';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E'>;
    formType: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E'>;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    text: Schema.Attribute.Blocks;
  };
}

export interface PageBlokOrganizacziyaMeropriyatij
  extends Struct.ComponentSchema {
  collectionName: 'components_page_blok_organizacziya_meropriyatij';
  info: {
    displayName: '\u0411\u043B\u043E\u043A \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    tabs: Schema.Attribute.Component<'page.taby', true>;
  };
}

export interface PageBlokOrganizacziyaMeropriyatijRasshirennyj
  extends Struct.ComponentSchema {
  collectionName: 'components_page_blok_organizacziya_meropriyatij_rasshirennyj';
  info: {
    displayName: '\u0411\u043B\u043E\u043A \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439 (\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0439)';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    tabs: Schema.Attribute.Component<'page.taby', true>;
  };
}

export interface PageBlokSKartoj extends Struct.ComponentSchema {
  collectionName: 'components_page_blok_s_kartoj';
  info: {
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u043A\u0430\u0440\u0442\u043E\u0439';
    icon: 'pinMap';
  };
  attributes: {
    coordinates: Schema.Attribute.JSON & Schema.Attribute.Required;
    description: Schema.Attribute.Blocks;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
  };
}

export interface PageBlokSTekstom extends Struct.ComponentSchema {
  collectionName: 'components_page_blok_s_tekstom';
  info: {
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C';
    icon: 'layer';
  };
  attributes: {
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    text: Schema.Attribute.Blocks;
  };
}

export interface PageBlokSUslugami extends Struct.ComponentSchema {
  collectionName: 'components_page_blok_s_uslugami';
  info: {
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438';
    icon: 'handHeart';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    service: Schema.Attribute.Component<'page.kartochka-uslugi', true>;
  };
}

export interface PageBlokUchebnyeKorpusa extends Struct.ComponentSchema {
  collectionName: 'components_page_blok_uchebnye_korpusa';
  info: {
    displayName: '\u0411\u043B\u043E\u043A \u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043E\u0442\u0434\u044B\u0445';
    icon: 'walk';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    gallery: Schema.Attribute.Media<'images', true>;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
  };
}

export interface PageBlokUslugiSetka extends Struct.ComponentSchema {
  collectionName: 'components_page_blok_uslugi_setkas';
  info: {
    description: '\u0421\u0435\u043A\u0446\u0438\u044F \u0441 \u0447\u0435\u0440\u0435\u0434\u0443\u044E\u0449\u0438\u043C\u0438\u0441\u044F \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u043C\u0438: \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 + \u0442\u0435\u043A\u0441\u0442';
    displayName: '\u0411\u043B\u043E\u043A \u0443\u0441\u043B\u0443\u0433\u0438 (\u0441\u0435\u0442\u043A\u0430)';
    icon: 'grid';
  };
  attributes: {
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    items: Schema.Attribute.Component<'page.usluga-setka-element', true>;
  };
}

export interface PageBlokVakansii extends Struct.ComponentSchema {
  collectionName: 'components_page_blok_vakansiis';
  info: {
    description: '\u0421\u0435\u043A\u0446\u0438\u044F \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0439: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A + \u0442\u0435\u043A\u0441\u0442 + \u0441\u043F\u0438\u0441\u043E\u043A \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0439';
    displayName: '\u0411\u043B\u043E\u043A: \u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0438';
    icon: 'briefcase';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    items: Schema.Attribute.Component<'page.vakansiya', true>;
  };
}

export interface PageInfoBlok extends Struct.ComponentSchema {
  collectionName: 'components_page_info_blok';
  info: {
    description: '';
    displayName: '\u0418\u043D\u0444\u043E \u0431\u043B\u043E\u043A';
    icon: 'slideshow';
  };
  attributes: {
    cards: Schema.Attribute.Component<'page.kartochka', true>;
    description: Schema.Attribute.Blocks;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    images: Schema.Attribute.Media<'images', true>;
    is_video: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    video_url: Schema.Attribute.String;
  };
}

export interface PageKartochka extends Struct.ComponentSchema {
  collectionName: 'components_page_kartochka';
  info: {
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430';
    icon: 'layout';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    icon: Schema.Attribute.Media<'images'>;
    theme: Schema.Attribute.Enumeration<['primary', 'secondary', 'muted']> &
      Schema.Attribute.DefaultTo<'primary'>;
    title: Schema.Attribute.String;
  };
}

export interface PageKartochkaUslugi extends Struct.ComponentSchema {
  collectionName: 'components_page_kartochka_uslugi';
  info: {
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0443\u0441\u043B\u0443\u0433\u0438';
    icon: 'calendar';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface PageKnopki extends Struct.ComponentSchema {
  collectionName: 'components_page_knopki';
  info: {
    displayName: '\u041A\u043D\u043E\u043F\u043A\u0438';
    icon: 'cursor';
  };
  attributes: {
    link: Schema.Attribute.Component<'page.ssylka', false>;
    theme: Schema.Attribute.Enumeration<['primary', 'secondary', 'muted']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface PageNomer extends Struct.ComponentSchema {
  collectionName: 'components_page_nomer';
  info: {
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043D\u043E\u043C\u0435\u0440\u0430';
    icon: 'crop';
  };
  attributes: {
    button: Schema.Attribute.Component<'menu.knopka', true>;
    description: Schema.Attribute.Blocks;
    features: Schema.Attribute.Component<'page.opczii', true>;
    photos: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageNomera extends Struct.ComponentSchema {
  collectionName: 'components_page_nomera';
  info: {
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u043D\u043E\u043C\u0435\u0440\u0430\u043C\u0438';
    icon: 'house';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    hotel_rooms: Schema.Attribute.Relation<'oneToMany', 'api::room.room'>;
  };
}

export interface PageOpczii extends Struct.ComponentSchema {
  collectionName: 'components_page_opczii';
  info: {
    displayName: '\u041E\u043F\u0446\u0438\u0438';
    icon: 'server';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    theme: Schema.Attribute.Enumeration<['primary', 'secondary', 'muted']>;
    title: Schema.Attribute.String;
  };
}

export interface PagePervyjEkran extends Struct.ComponentSchema {
  collectionName: 'components_page_pervyj_ekran';
  info: {
    description: '';
    displayName: '\u041F\u0435\u0440\u0432\u044B\u0439 \u044D\u043A\u0440\u0430\u043D';
    icon: 'monitor';
  };
  attributes: {
    slides: Schema.Attribute.Component<'page.slajd-hero', true>;
  };
}

export interface PagePervyjEkranMini extends Struct.ComponentSchema {
  collectionName: 'components_page_pervyj_ekran_mini_s';
  info: {
    displayName: '\u041F\u0435\u0440\u0432\u044B\u0439 \u044D\u043A\u0440\u0430\u043D (\u043C\u0438\u043D\u0438)';
    icon: 'picture';
  };
  attributes: {
    header: Schema.Attribute.Component<'page.zagolovok', false>;
    images: Schema.Attribute.Media<'images', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface PageSeo extends Struct.ComponentSchema {
  collectionName: 'components_page_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'globe';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaField: Schema.Attribute.Component<'seo.meta-field', true>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaTitle: Schema.Attribute.String;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface PageSlajdHero extends Struct.ComponentSchema {
  collectionName: 'components_page_slajd_hero';
  info: {
    description: '\u0421\u043B\u0430\u0439\u0434 \u0434\u043B\u044F \u0433\u043B\u0430\u0432\u043D\u043E\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430 \u0441 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435\u043C \u0438 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u043E\u043B\u044F\u043C\u0438';
    displayName: '\u0421\u043B\u0430\u0439\u0434 Hero';
    icon: 'picture';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    linkText: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageSsylka extends Struct.ComponentSchema {
  collectionName: 'components_page_ssylka';
  info: {
    displayName: '\u0421\u0441\u044B\u043B\u043A\u0430';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    target: Schema.Attribute.Enumeration<['_blank']> &
      Schema.Attribute.DefaultTo<'_blank'>;
  };
}

export interface PageTaby extends Struct.ComponentSchema {
  collectionName: 'components_page_taby';
  info: {
    displayName: '\u0422\u0430\u0431';
    icon: 'server';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'page.knopki', false>;
    content: Schema.Attribute.Blocks;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Unique &
      Schema.Attribute.DefaultTo<0>;
    photos: Schema.Attribute.Media<'images', true>;
    slug: Schema.Attribute.String;
  };
}

export interface PageUdobstva extends Struct.ComponentSchema {
  collectionName: 'components_page_udobstva';
  info: {
    description: '\u0421\u0435\u043A\u0446\u0438\u044F \u0441 \u043F\u043B\u0430\u0448\u043A\u0430\u043C\u0438 (\u0438\u043A\u043E\u043D\u043A\u0430 + \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A + \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435)';
    displayName: '\u0423\u0434\u043E\u0431\u0441\u0442\u0432\u0430';
    icon: 'grid';
  };
  attributes: {
    cards: Schema.Attribute.Component<'page.kartochka', true>;
    header: Schema.Attribute.Component<'page.zagolovok', false>;
  };
}

export interface PageUslugaSetkaElement extends Struct.ComponentSchema {
  collectionName: 'components_page_usluga_setka_elements';
  info: {
    description: '\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u0431\u043B\u043E\u043A\u0430 \u0443\u0441\u043B\u0443\u0433-\u0441\u0435\u0442\u043A\u0438: \u043F\u043E\u0434\u043F\u0438\u0441\u044C + \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A + \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 + \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0430';
    displayName: '\u0423\u0441\u043B\u0443\u0433\u0430 (\u0441\u0435\u0442\u043A\u0430) - \u044D\u043B\u0435\u043C\u0435\u043D\u0442';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E'>;
    title: Schema.Attribute.String;
  };
}

export interface PageVakansiya extends Struct.ComponentSchema {
  collectionName: 'components_page_vakansiyas';
  info: {
    description: '\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441\u043F\u0438\u0441\u043A\u0430 \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0439: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A + \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435';
    displayName: '\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u044F';
    icon: 'briefcase';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageZagolovok extends Struct.ComponentSchema {
  collectionName: 'components_page_zagolovok';
  info: {
    displayName: '\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A';
    icon: 'bold';
  };
  attributes: {
    label: Schema.Attribute.Text;
    theme: Schema.Attribute.Enumeration<[' primary', 'secondary', 'muted']> &
      Schema.Attribute.DefaultTo<' primary'>;
    title: Schema.Attribute.Text;
  };
}

export interface SeoMetaField extends Struct.ComponentSchema {
  collectionName: 'components_seo_meta_fields';
  info: {
    displayName: 'metaField';
    icon: 'earth';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'menu.knopka': MenuKnopka;
      'menu.logo': MenuLogo;
      'menu.punkt-menyu': MenuPunktMenyu;
      'menu.ssylka': MenuSsylka;
      'menu.tekst': MenuTekst;
      'menu.vypadayushhee-menyu': MenuVypadayushheeMenyu;
      'page.blok-kontakty': PageBlokKontakty;
      'page.blok-obratnaya-svyaz': PageBlokObratnayaSvyaz;
      'page.blok-organizacziya-meropriyatij': PageBlokOrganizacziyaMeropriyatij;
      'page.blok-organizacziya-meropriyatij-rasshirennyj': PageBlokOrganizacziyaMeropriyatijRasshirennyj;
      'page.blok-s-kartoj': PageBlokSKartoj;
      'page.blok-s-tekstom': PageBlokSTekstom;
      'page.blok-s-uslugami': PageBlokSUslugami;
      'page.blok-uchebnye-korpusa': PageBlokUchebnyeKorpusa;
      'page.blok-uslugi-setka': PageBlokUslugiSetka;
      'page.blok-vakansii': PageBlokVakansii;
      'page.info-blok': PageInfoBlok;
      'page.kartochka': PageKartochka;
      'page.kartochka-uslugi': PageKartochkaUslugi;
      'page.knopki': PageKnopki;
      'page.nomer': PageNomer;
      'page.nomera': PageNomera;
      'page.opczii': PageOpczii;
      'page.pervyj-ekran': PagePervyjEkran;
      'page.pervyj-ekran-mini': PagePervyjEkranMini;
      'page.seo': PageSeo;
      'page.slajd-hero': PageSlajdHero;
      'page.ssylka': PageSsylka;
      'page.taby': PageTaby;
      'page.udobstva': PageUdobstva;
      'page.usluga-setka-element': PageUslugaSetkaElement;
      'page.vakansiya': PageVakansiya;
      'page.zagolovok': PageZagolovok;
      'seo.meta-field': SeoMetaField;
    }
  }
}
