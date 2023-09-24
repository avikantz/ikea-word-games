# Ordspel docs

### Sourcing products

This app includes localization specific content in the form of product names, descriptions, and images. These are generated from the [IKEA product catalog](https://sik.search.blue.cdtapps.com/us/en/search-result-page?size=10).

This is localized, so for example, the US catalog is available at [us/en](https://sik.search.blue.cdtapps.com/us/en/search-result-page?size=10), and the Spanish catalog is available at [es/es](https://sik.search.blue.cdtapps.com/es/es/search-result-page?size=10).

Total catalog size is about 28,000 for most locales. But a lot of products share the same name. These are removed. Calling the above API with size 10,000 returns about 1900 trimmed product names.

The above API returns a lot of data, so it's trimmed down to only the required fields.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Product ID |
| `name` | `string` | Product name |
| `desc` | `string` | Product description (localized) |
| `image` | `string` | Product image URL (localized) |
| `pImage` | `string` | Product image (contextual) URL (localized) |
| `url` | `string` | Product URL (localized) |

### Generating

Using the above data, the following files are generated:

| File | Description |
|------|-------------|
| `items/list.json` | Trimmed down list of IKEA Product type |
| `items/map.json` | Map of IKEA Product name to Product type |
| `names/{size}.json` | List of IKEA Product names of a set size |
| `names/all.json` | List of all IKEA Product names |
| `unique/{size}.json` | List of unique IKEA Product names of a set size |
| `unique/all.json` | List of all unique IKEA Product names |
| `unique/easy.json` | List of top 100 unique IKEA Product names |
| `unique/medium.json` | List of top 250 unique IKEA Product names |
| `unique/hard.json` | List of top 500 unique IKEA Product names |

*Unique* names here refer to names that cannot be jumbled into another product name. E.g. `ADDE` and `DEAD` are not unique, but `ADDE` and `EDAM` are. If such conflicts are found, the less popular name is omitted.

You can find the locale related product files in `public/data`.
