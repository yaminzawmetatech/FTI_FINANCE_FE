import optionModules from "./optionModules";
import { getPurchasedModuleIds } from "app/config/moduleRegistry";

export const buildAdvancedSearchProviderRegistry = (searchProviders) => {
  const moduleIds = getPurchasedModuleIds();
  const providers = moduleIds.map((moduleId) => {
    const provider = searchProviders[moduleId];
    if (!provider) {
      throw new Error(`No AdvancedSearch provider is registered for module "${moduleId}".`);
    }
    return provider;
  });
  const optionTypes = new Map();

  for (const provider of providers) {
    for (const optionType of provider.optionTypes) {
      if (optionTypes.has(optionType)) {
        throw new Error(`AdvancedSearch option "${optionType}" has multiple providers.`);
      }
      optionTypes.set(optionType, provider);
    }
  }

  for (const [optionType, ownerModule] of Object.entries(optionModules)) {
    if (moduleIds.includes(ownerModule) && !optionTypes.has(optionType)) {
      throw new Error(
        `AdvancedSearch option "${optionType}" has no provider for module "${ownerModule}".`
      );
    }
  }

  let previousState;
  let previousSearchState;
  const selectState = (state) => {
    if (state === previousState) return previousSearchState;

    previousState = state;
    previousSearchState = providers.reduce(
      (searchState, provider) =>
        Object.assign(searchState, provider.selectState(state)),
      {}
    );
    return previousSearchState;
  };

  return {
    selectState,
    isOptionAvailable: (optionType) => {
      const ownerModule = optionModules[optionType];
      return !ownerModule || moduleIds.includes(ownerModule);
    },
    loadOption: (dispatch, optionType) => {
      const provider = optionTypes.get(optionType);
      if (!provider && optionModules[optionType]) {
        throw new Error(`AdvancedSearch option "${optionType}" has no registered provider.`);
      }
      if (!provider) return;
      const loader = provider.loaders[optionType];
      if (loader) loader(dispatch);
    },
  };
};
