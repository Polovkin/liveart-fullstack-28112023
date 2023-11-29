# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- [EntityPage]('../admin-SPA/src/components/common/EntityPage.vue') - component similar to EntityDialog but as separate page with slightly different markup

### Changed
- [EntityDialog]('../admin-SPA/src/components/common/EntityDialog.vue') - dialog is persistent

## [0.1.0] - 2023-07-17
### Added
- Vue 3, Vuex 4, Typescript, Linters, Composition API, Vuetify 3, default README
- Crud Table Component (`EntityTable`)
- Crud Dialog component (`EntityDialog`)
- Overall application skeleton, Vue router
- Product and ProductCategory entities as a sample
- Custom API client (`CrudEndpoint`)
- Filters models, basic pagination, sort, search
