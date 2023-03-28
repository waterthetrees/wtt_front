const countriesAll = [
  { alpha3: 'USA', name: 'United States of America' },
  { alpha3: 'ABW', name: 'Aruba' },
  { alpha3: 'AFG', name: 'Afghanistan' },
  { alpha3: 'AGO', name: 'Angola' },
  { alpha3: 'AIA', name: 'Anguilla' },
  { alpha3: 'ALA', name: 'Åland Islands' },
  { alpha3: 'ALB', name: 'Albania' },
  { alpha3: 'AND', name: 'Andorra' },
  { alpha3: 'ARE', name: 'United Arab Emirates' },
  { alpha3: 'ARG', name: 'Argentina' },
  { alpha3: 'ARM', name: 'Armenia' },
  { alpha3: 'ASM', name: 'American Samoa' },
  { alpha3: 'ATA', name: 'Antarctica' },
  { alpha3: 'ATF', name: 'French Southern Territories' },
  { alpha3: 'ATG', name: 'Antigua and Barbuda' },
  { alpha3: 'AUS', name: 'Australia' },
  { alpha3: 'AUT', name: 'Austria' },
  { alpha3: 'AZE', name: 'Azerbaijan' },
  { alpha3: 'BDI', name: 'Burundi' },
  { alpha3: 'BEL', name: 'Belgium' },
  { alpha3: 'BEN', name: 'Benin' },
  { alpha3: 'BES', name: 'Bonaire, Sint Eustatius and Saba' },
  { alpha3: 'BFA', name: 'Burkina Faso' },
  { alpha3: 'BGD', name: 'Bangladesh' },
  { alpha3: 'BGR', name: 'Bulgaria' },
  { alpha3: 'BHR', name: 'Bahrain' },
  { alpha3: 'BHS', name: 'Bahamas' },
  { alpha3: 'BIH', name: 'Bosnia and Herzegovina' },
  { alpha3: 'BLM', name: 'Saint Barthélemy' },
  { alpha3: 'BLR', name: 'Belarus' },
  { alpha3: 'BLZ', name: 'Belize' },
  { alpha3: 'BMU', name: 'Bermuda' },
  { alpha3: 'BOL', name: 'Bolivia (Plurinational State of)' },
  { alpha3: 'BRA', name: 'Brazil' },
  { alpha3: 'BRB', name: 'Barbados' },
  { alpha3: 'BRN', name: 'Brunei Darussalam' },
  { alpha3: 'BTN', name: 'Bhutan' },
  { alpha3: 'BVT', name: 'Bouvet Island' },
  { alpha3: 'BWA', name: 'Botswana' },
  { alpha3: 'CAF', name: 'Central African Republic' },
  { alpha3: 'CAN', name: 'Canada' },
  { alpha3: 'CCK', name: 'Cocos (Keeling) Islands' },
  { alpha3: 'CHE', name: 'Switzerland' },
  { alpha3: 'CHL', name: 'Chile' },
  { alpha3: 'CHN', name: 'China' },
  { alpha3: 'CIV', name: `Côte d'Ivoire` },
  { alpha3: 'CMR', name: 'Cameroon' },
  { alpha3: 'COD', name: 'Congo, Democratic Republic of the' },
  { alpha3: 'COG', name: 'Congo' },
  { alpha3: 'COK', name: 'Cook Islands' },
  { alpha3: 'COL', name: 'Colombia' },
  { alpha3: 'COM', name: 'Comoros' },
  { alpha3: 'CPV', name: 'Cabo Verde' },
  { alpha3: 'CRI', name: 'Costa Rica' },
  { alpha3: 'CUB', name: 'Cuba' },
  { alpha3: 'CUW', name: 'Curaçao' },
  { alpha3: 'CXR', name: 'Christmas Island' },
  { alpha3: 'CYM', name: 'Cayman Islands' },
  { alpha3: 'CYP', name: 'Cyprus' },
  { alpha3: 'CZE', name: 'Czechia' },
  { alpha3: 'DEU', name: 'Germany' },
  { alpha3: 'DJI', name: 'Djibouti' },
  { alpha3: 'DMA', name: 'Dominica' },
  { alpha3: 'DNK', name: 'Denmark' },
  { alpha3: 'DOM', name: 'Dominican Republic' },
  { alpha3: 'DZA', name: 'Algeria' },
  { alpha3: 'ECU', name: 'Ecuador' },
  { alpha3: 'EGY', name: 'Egypt' },
  { alpha3: 'ERI', name: 'Eritrea' },
  { alpha3: 'ESH', name: 'Western Sahara' },
  { alpha3: 'ESP', name: 'Spain' },
  { alpha3: 'EST', name: 'Estonia' },
  { alpha3: 'ETH', name: 'Ethiopia' },
  { alpha3: 'FIN', name: 'Finland' },
  { alpha3: 'FJI', name: 'Fiji' },
  { alpha3: 'FLK', name: 'Falkland Islands (Malvinas)' },
  { alpha3: 'FRA', name: 'France' },
  { alpha3: 'FRO', name: 'Faroe Islands' },
  { alpha3: 'FSM', name: 'Micronesia (Federated States of)' },
  { alpha3: 'GAB', name: 'Gabon' },
  { alpha3: 'GEO', name: 'Georgia' },
  { alpha3: 'GGY', name: 'Guernsey' },
  { alpha3: 'GHA', name: 'Ghana' },
  { alpha3: 'GIB', name: 'Gibraltar' },
  { alpha3: 'GIN', name: 'Guinea' },
  { alpha3: 'GLP', name: 'Guadeloupe' },
  { alpha3: 'GMB', name: 'Gambia' },
  { alpha3: 'GNB', name: 'Guinea-Bissau' },
  { alpha3: 'GNQ', name: 'Equatorial Guinea' },
  { alpha3: 'GRC', name: 'Greece' },
  { alpha3: 'GRD', name: 'Grenada' },
  { alpha3: 'GRL', name: 'Greenland' },
  { alpha3: 'GTM', name: 'Guatemala' },
  { alpha3: 'GUF', name: 'French Guiana' },
  { alpha3: 'GUM', name: 'Guam' },
  { alpha3: 'GUY', name: 'Guyana' },
  { alpha3: 'HKG', name: 'Hong Kong' },
  { alpha3: 'HMD', name: 'Heard Island and McDonald Islands' },
  { alpha3: 'HND', name: 'Honduras' },
  { alpha3: 'HRV', name: 'Croatia' },
  { alpha3: 'HTI', name: 'Haiti' },
  { alpha3: 'HUN', name: 'Hungary' },
  { alpha3: 'IDN', name: 'Indonesia' },
  { alpha3: 'IMN', name: 'Isle of Man' },
  { alpha3: 'IND', name: 'India' },
  { alpha3: 'IOT', name: 'British Indian Ocean Territory' },
  { alpha3: 'IRL', name: 'Ireland' },
  { alpha3: 'IRN', name: 'Iran (Islamic Republic of)' },
  { alpha3: 'IRQ', name: 'Iraq' },
  { alpha3: 'ISL', name: 'Iceland' },
  { alpha3: 'ISR', name: 'Israel' },
  { alpha3: 'ITA', name: 'Italy' },
  { alpha3: 'JAM', name: 'Jamaica' },
  { alpha3: 'JEY', name: 'Jersey' },
  { alpha3: 'JOR', name: 'Jordan' },
  { alpha3: 'JPN', name: 'Japan' },
  { alpha3: 'KAZ', name: 'Kazakhstan' },
  { alpha3: 'KEN', name: 'Kenya' },
  { alpha3: 'KGZ', name: 'Kyrgyzstan' },
  { alpha3: 'KHM', name: 'Cambodia' },
  { alpha3: 'KIR', name: 'Kiribati' },
  { alpha3: 'KNA', name: 'Saint Kitts and Nevis' },
  { alpha3: 'KOR', name: 'Korea, Republic of' },
  { alpha3: 'KWT', name: 'Kuwait' },
  { alpha3: 'LAO', name: `Lao People's Democratic Republic` },
  { alpha3: 'LBN', name: 'Lebanon' },
  { alpha3: 'LBR', name: 'Liberia' },
  { alpha3: 'LBY', name: 'Libya' },
  { alpha3: 'LCA', name: 'Saint Lucia' },
  { alpha3: 'LIE', name: 'Liechtenstein' },
  { alpha3: 'LKA', name: 'Sri Lanka' },
  { alpha3: 'LSO', name: 'Lesotho' },
  { alpha3: 'LTU', name: 'Lithuania' },
  { alpha3: 'LUX', name: 'Luxembourg' },
  { alpha3: 'LVA', name: 'Latvia' },
  { alpha3: 'MAC', name: 'Macao' },
  { alpha3: 'MAF', name: 'Saint Martin (French part)' },
  { alpha3: 'MAR', name: 'Morocco' },
  { alpha3: 'MCO', name: 'Monaco' },
  { alpha3: 'MDA', name: 'Moldova, Republic of' },
  { alpha3: 'MDG', name: 'Madagascar' },
  { alpha3: 'MDV', name: 'Maldives' },
  { alpha3: 'MEX', name: 'Mexico' },
  { alpha3: 'MHL', name: 'Marshall Islands' },
  { alpha3: 'MKD', name: 'North Macedonia' },
  { alpha3: 'MLI', name: 'Mali' },
  { alpha3: 'MLT', name: 'Malta' },
  { alpha3: 'MMR', name: 'Myanmar' },
  { alpha3: 'MNE', name: 'Montenegro' },
  { alpha3: 'MNG', name: 'Mongolia' },
  { alpha3: 'MNP', name: 'Northern Mariana Islands' },
  { alpha3: 'MOZ', name: 'Mozambique' },
  { alpha3: 'MRT', name: 'Mauritania' },
  { alpha3: 'MSR', name: 'Montserrat' },
  { alpha3: 'MTQ', name: 'Martinique' },
  { alpha3: 'MUS', name: 'Mauritius' },
  { alpha3: 'MWI', name: 'Malawi' },
  { alpha3: 'MYS', name: 'Malaysia' },
  { alpha3: 'MYT', name: 'Mayotte' },
  { alpha3: 'NAM', name: 'Namibia' },
  { alpha3: 'NCL', name: 'New Caledonia' },
  { alpha3: 'NER', name: 'Niger' },
  { alpha3: 'NFK', name: 'Norfolk Island' },
  { alpha3: 'NGA', name: 'Nigeria' },
  { alpha3: 'NIC', name: 'Nicaragua' },
  { alpha3: 'NIU', name: 'Niue' },
  { alpha3: 'NLD', name: 'Netherlands' },
  { alpha3: 'NOR', name: 'Norway' },
  { alpha3: 'NPL', name: 'Nepal' },
  { alpha3: 'NRU', name: 'Nauru' },
  { alpha3: 'NZL', name: 'New Zealand' },
  { alpha3: 'OMN', name: 'Oman' },
  { alpha3: 'PAK', name: 'Pakistan' },
  { alpha3: 'PAN', name: 'Panama' },
  { alpha3: 'PCN', name: 'Pitcairn' },
  { alpha3: 'PER', name: 'Peru' },
  { alpha3: 'PHL', name: 'Philippines' },
  { alpha3: 'PLW', name: 'Palau' },
  { alpha3: 'PNG', name: 'Papua New Guinea' },
  { alpha3: 'POL', name: 'Poland' },
  { alpha3: 'PRI', name: 'Puerto Rico' },
  { alpha3: 'PRK', name: `Korea (Democratic People's Republic of)` },
  { alpha3: 'PRT', name: 'Portugal' },
  { alpha3: 'PRY', name: 'Paraguay' },
  { alpha3: 'PSE', name: 'Palestine, State of' },
  { alpha3: 'PYF', name: 'French Polynesia' },
  { alpha3: 'QAT', name: 'Qatar' },
  { alpha3: 'REU', name: 'Réunion' },
  { alpha3: 'ROU', name: 'Romania' },
  { alpha3: 'RUS', name: 'Russian Federation' },
  { alpha3: 'RWA', name: 'Rwanda' },
  { alpha3: 'SAU', name: 'Saudi Arabia' },
  { alpha3: 'SDN', name: 'Sudan' },
  { alpha3: 'SEN', name: 'Senegal' },
  { alpha3: 'SGP', name: 'Singapore' },
  { alpha3: 'SGS', name: 'South Georgia and the South Sandwich Islands' },
  { alpha3: 'SHN', name: 'Saint Helena, Ascension and Tristan da Cunha' },
  { alpha3: 'SJM', name: 'Svalbard and Jan Mayen' },
  { alpha3: 'SLB', name: 'Solomon Islands' },
  { alpha3: 'SLE', name: 'Sierra Leone' },
  { alpha3: 'SLV', name: 'El Salvador' },
  { alpha3: 'SMR', name: 'San Marino' },
  { alpha3: 'SOM', name: 'Somalia' },
  { alpha3: 'SPM', name: 'Saint Pierre and Miquelon' },
  { alpha3: 'SRB', name: 'Serbia' },
  { alpha3: 'SSD', name: 'South Sudan' },
  { alpha3: 'STP', name: 'Sao Tome and Principe' },
  { alpha3: 'SUR', name: 'Suriname' },
  { alpha3: 'SVK', name: 'Slovakia' },
  { alpha3: 'SVN', name: 'Slovenia' },
  { alpha3: 'SWE', name: 'Sweden' },
  { alpha3: 'SWZ', name: 'Eswatini' },
  { alpha3: 'SXM', name: 'Sint Maarten (Dutch part)' },
  { alpha3: 'SYC', name: 'Seychelles' },
  { alpha3: 'SYR', name: 'Syrian Arab Republic' },
  { alpha3: 'TCA', name: 'Turks and Caicos Islands' },
  { alpha3: 'TCD', name: 'Chad' },
  { alpha3: 'TGO', name: 'Togo' },
  { alpha3: 'THA', name: 'Thailand' },
  { alpha3: 'TJK', name: 'Tajikistan' },
  { alpha3: 'TKL', name: 'Tokelau' },
  { alpha3: 'TKM', name: 'Turkmenistan' },
  { alpha3: 'TLS', name: 'Timor-Leste' },
  { alpha3: 'TON', name: 'Tonga' },
  { alpha3: 'TTO', name: 'Trinidad and Tobago' },
  { alpha3: 'TUN', name: 'Tunisia' },
  { alpha3: 'TUR', name: 'Türkiye' },
  { alpha3: 'TUV', name: 'Tuvalu' },
  { alpha3: 'TWN', name: 'Taiwan, Province of China' },
  { alpha3: 'TZA', name: 'Tanzania, United Republic of' },
  { alpha3: 'UGA', name: 'Uganda' },
  { alpha3: 'UKR', name: 'Ukraine' },
  { alpha3: 'UMI', name: 'United States Minor Outlying Islands' },
  { alpha3: 'URY', name: 'Uruguay' },
  { alpha3: 'UZB', name: 'Uzbekistan' },
  { alpha3: 'VAT', name: 'Holy See' },
  { alpha3: 'VCT', name: 'Saint Vincent and the Grenadines' },
  { alpha3: 'VEN', name: 'Venezuela (Bolivarian Republic of)' },
  { alpha3: 'VGB', name: 'Virgin Islands (British)' },
  { alpha3: 'VIR', name: 'Virgin Islands (U.S.)' },
  { alpha3: 'VNM', name: 'Viet Nam' },
  { alpha3: 'VUT', name: 'Vanuatu' },
  { alpha3: 'WLF', name: 'Wallis and Futuna' },
  { alpha3: 'WSM', name: 'Samoa' },
  { alpha3: 'YEM', name: 'Yemen' },
  { alpha3: 'ZAF', name: 'South Africa' },
  { alpha3: 'ZMB', name: 'Zambia' },
  { alpha3: 'ZWE', name: 'Zimbabwe' },
];

const licensesAll = [
  { name: 'Water the Trees License (WTT)' },
  { name: 'Apache License 2.0 (Apache-2.0)' },
  { name: '3-clause BSD license (BSD-3-Clause)' },
  { name: '2-clause BSD license (BSD-2-Clause)' },
  { name: 'GNU General Public License (GPL)' },
  { name: 'GNU Lesser General Public License (LGPL)' },
  { name: 'MIT license (MIT)' },
  { name: 'Mozilla Public License 2.0 (MPL-2.0)' },
  { name: 'Common Development and Distribution License 1.0 (CDDL-1.0)' },
  { name: 'Eclipse Public License 2.0 (EPL-2.0)' },
  { name: 'CeCILL License 2.1' },
  { name: 'European Union Public License (EUPL-1.2)' },
  {
    name: 'Licence Libre du Québec - Permissive (LiLiQ-P) version 1.1 (LiLiQ-P-1.1)',
  },
  {
    name: 'Licence Libre du Québec - Réciprocité (LiLiQ-R) version 1.1 (LiLiQ-R-1.1)',
  },
  {
    name: 'Licence Libre du Québec - Réciprocité forte (LiLiQ-R+) version 1.1 (LiLiQ-Rplus-1.1)',
  },
  { name: 'Mulan Permissive Software License v2 (MulanPSL - 2.0)' },
  { name: 'Open Data Commons Attribution License (ODC-By-1.0)' },
  { name: 'BSD+Patent (BSD-2-Clause-Patent)' },
  { name: 'CERN Open Hardware Licence Version 2 - Permissive' },
  { name: 'CERN Open Hardware Licence Version 2 - Weakly Reciprocal' },
  { name: 'CERN Open Hardware Licence Version 2 - Strongly Reciprocal' },
  { name: 'Educational Community License, Version 2.0 (ECL-2.0)' },
  { name: 'IPA Font License (IPA)' },
  {
    name: 'Lawrence Berkeley National Labs BSD Variant License (BSD-3-Clause-LBNL)',
  },
  { name: 'NASA Open Source Agreement 1.3 (NASA-1.3)' },
  { name: 'OSET Public License version 2.1 (OSET-PL-2.1)' },
  { name: 'SIL Open Font License 1.1 (OFL-1.1)' },
  { name: 'Unicode License Agreement - Data Files and Software' },
  { name: 'The Unlicense (Unlicense)' },
  { name: 'Upstream Compatibility License v1.0 (UCL-1.0)' },
];

const formatsAll = [
  { name: 'csv' },
  { name: 'shp' },
  { name: 'geojson' },
  { name: 'kml' },
  { name: 'kmz' },
  { name: 'gdb' },
  { name: 'zip' },
];

const licenses = createOptions(licensesAll);
const formats = createOptions(formatsAll);
const countries = createOptions(countriesAll);
const isoAlpha3 = createAlpha(countriesAll);

const sourceFields = () => {
  const defaultNewSourceName = `newsource-${new Date().toISOString()}`;
  const defaultDownload = `https://waterthetrees.com/api/csv/${defaultNewSourceName}.csv`;
  return {
    header: 'Source Details',
    summary: 'Add details about your new source.',
    inputs: [
      {
        label: 'Broken',
        name: 'source.broken',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        label: 'Source Name',
        name: 'source.idSourceName',
        type: 'text',
        rules: {
          required: { value: true, message: 'IdSourceName Required' },
          minLength: 1,
          maxLength: 40,
        },
        errorMessage: 'idSourceName is required',
      },
      {
        label: 'City',
        name: 'source.city',
        type: 'text',
        rules: {
          required: { value: true, message: 'City required' },
          minLength: 1,
          maxLength: 40,
        },
      },
      {
        label: 'Country',
        name: 'source.country',
        type: 'select',
        options: countries,
        rules: {
          required: { value: true, message: 'Country code required' },
        },
      },
      {
        label: 'Country Code',
        name: 'source.isoAlpha3',
        type: 'select',
        options: isoAlpha3,
        rules: {
          required: { value: true, message: 'Country code required' },
        },
      },
      {
        label: 'Info URL',
        name: 'source.info',
        type: 'url',
        rules: {
          required: { value: false, message: 'Not required' },
          minLength: 1,
          maxLength: 2000,
          pattern: {
            value:
              /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
            message: 'Format is not a real url',
          },
        },
      },
      {
        label: 'Source URL',
        name: 'source.download',
        defaultValue: defaultDownload,
        type: 'url',
        rules: {
          required: { value: false, message: 'required' },
          minLength: 1,
          maxLength: 2000,
          pattern: {
            value:
              /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
            message: 'File Download URL Format is not a real url',
          },
        },
      },
      {
        label: 'Latitude',
        name: 'source.latitude',
        defaultValue: '41.03',
        type: 'text',
        rules: {
          required: { value: true, message: 'required' },
          minLength: 1,
          maxLength: 11,
          pattern: {
            value: /^-?[0-9]{1,2}(?:\.[0-9]{1,10})?$/i,
            message: 'Latitude Format is not correct',
          },
        },
      },
      {
        label: 'Longitude',
        name: 'source.longitude',
        defaultValue: '-99.08',
        type: 'text',
        rules: {
          required: { value: true, message: 'required' },
          minLength: 1,
          maxLength: 12,
          pattern: {
            value:
              /^-?(?:180(?:\.0{1,10})?|(?:(?:(?:1[0-7]|[1-9])?\d)(?:\.\d{1,10})?))$/i,
            // value: /^-?(180(\.0{1,10})?|((1[0-7]|[1-9])?\d(\.\d{1,10})?))$/i,
            message: 'Longitude Format is not correct',
          },
        },
      },
      {
        label: 'Notes',
        name: 'source.notes',
        defaultValue: 'notes',
        type: 'text',
      },
      {
        label: 'Format',
        name: 'source.format',
        defaultValue: 'csv',
        type: 'select',
        options: formats,
        rules: {
          required: { value: true, message: 'required' },
        },
      },
      {
        label: 'Filename',
        name: 'source.filename',
        defaultValue: `${defaultNewSourceName}.csv`,
        type: 'text',
        rules: {
          required: { value: false, message: 'required' },
          minLength: 1,
          maxLength: 40,
        },
      },
      {
        label: 'License',
        name: 'source.license',
        defaultValue: 'Water the Trees License (WTT)',
        type: 'select',
        options: licenses,
      },
      {
        label: 'Email',
        name: 'source.email',
        defaultValue: 'info@waterthetrees.com',
        type: 'email',
        rules: {
          required: { value: false, message: 'required' },
          minLength: 1,
          maxLength: 40,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        },
        errorMessage: 'Email is required',
      },
      {
        label: 'Contact',
        name: 'source.contact',
        defaultValue: 'Water the Trees',
        type: 'text',
        rules: {
          required: { value: false, message: 'required' },
          minLength: 1,
          maxLength: 40,
        },
        errorMessage: 'Contact is required',
      },
      {
        label: 'Phone',
        name: 'source.phone',
        type: 'text',
        rules: {
          required: { value: false, message: 'required' },
          minLength: 8,
          maxLength: 14,
          pattern: {
            value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
            message: 'Invalid phone number',
          },
        },
        errorMessage: 'phone is required',
      },
    ],
  };
};
export const NEW_SOURCE_FIELDS = sourceFields();

// using crosswalk in the name so that these fields don't
// overwrite source fields with the same name
export const CROSSWALK_FIELDS = {
  header: 'Crosswalk',
  summary: `Map your data's column headers to ours.`,
  directions: `For example if your data header for Scientific Name is "scientific_nom", add that to the scientific input field. You can do automatic mapping by clicking the Upload Source Button`,
  inputs: [
    {
      label: 'Longitude',
      name: 'crosswalk.longitude',
      type: 'text',
      rules: { required: true, minLength: 1, maxLength: 20 },
      defaultValue: 'longitude',
    },
    {
      label: 'Latitude',
      name: 'crosswalk.latitude',
      type: 'text',
      rules: { required: true, minLength: 1, maxLength: 20 },
      defaultValue: 'latitude',
    },
    {
      label: 'Common Name',
      name: 'crosswalk.common',
      type: 'text',
      rules: { required: true, minLength: 1, maxLength: 40 },
      defaultValue: 'common',
    },
    {
      label: 'Scientific Name',
      name: 'crosswalk.scientific',
      type: 'text',
      rules: { required: true, minLength: 1, maxLength: 40 },
      defaultValue: 'scientific',
    },
    {
      label: 'Genus',
      name: 'crosswalk.genus',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 40 },
      defaultValue: 'genus',
    },
    {
      label: 'Species',
      name: 'crosswalk.species',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 40 },
      defaultValue: 'species',
    },
    {
      label: 'Family',
      name: 'crosswalk.family',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 40 },
      defaultValue: 'family',
    },
    {
      label: 'Class Name',
      name: 'crosswalk.class',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 40 },
      defaultValue: 'class',
    },
    {
      label: 'Organization Reference Id',
      name: 'crosswalk.idReference',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'idReference',
    },
    {
      label: 'Street Address',
      name: 'crosswalk.address',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'address',
    },
    {
      label: 'City',
      name: 'crosswalk.city',
      type: 'text',
      rules: { required: true, minLength: 1, maxLength: 20 },
      defaultValue: 'city',
    },
    {
      label: 'State',
      name: 'crosswalk.state',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'state',
    },
    {
      label: 'Neighborhood',
      name: 'crosswalk.neighborhood',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'neighborhood',
    },
    {
      label: 'Zip Code',
      name: 'crosswalk.zip',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'zip',
    },
    {
      label: 'Health',
      name: 'crosswalk.health',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'health',
    },
    {
      label: 'Date Planted',
      name: 'crosswalk.planted',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'planted',
    },
    {
      label: 'Irrigation',
      name: 'crosswalk.irrigation',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'irrigation',
    },
    {
      label: 'count',
      name: 'crosswalk.count',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'count',
    },
    {
      label: 'Diameter at Breast Height (DBH)',
      name: 'crosswalk.dbh',
      type: 'text',
      rules: { required: true, minLength: 1, maxLength: 20 },
      defaultValue: 'dbh',
    },
    {
      label: 'Height',
      name: 'crosswalk.height',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'height',
    },
    {
      label: 'Age',
      name: 'crosswalk.age',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'height',
    },
    {
      label: 'Owner',
      name: 'crosswalk.owner',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'owner',
    },
    {
      label: 'Status',
      name: 'crosswalk.status',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'status',
    },
    {
      label: 'Notes',
      name: 'crosswalk.notes',
      type: 'text',
      rules: { required: false, minLength: 1, maxLength: 20 },
      defaultValue: 'notes',
    },
  ],
};

function createOptions(arr) {
  return arr.map((option) => ({
    value: option.name,
    label: option.name,
  }));
}

function createAlpha(arr) {
  return arr.map((option) => ({
    value: option.alpha3,
    label: option.alpha3,
  }));
}
