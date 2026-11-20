jest.mock("app/config/moduleRegistry", () => ({
  getPurchasedModuleIds: () => ["administration"],
}));

import { buildAdvancedSearchProviderRegistry } from "./createRegistry";

describe("buildAdvancedSearchProviderRegistry", () => {
  it("uses only purchased providers and memoizes selected state", () => {
    const selectState = jest.fn((state) => ({ selected: state.selected }));
    const adminProvider = {
      optionTypes: [
        "autocomplete_category",
        "autocomplete_mob_category",
        "autocomplete_sub_category",
        "autocomplete_state",
        "autocomplete_township",
        "autocomplete_ward",
        "autocomplete_user",
        "autocomplete_ihco",
        "autocomplete_cmco",
        "autocomplete_collateral_type",
      ],
      selectState,
      loaders: {},
    };
    const registry = buildAdvancedSearchProviderRegistry({
      administration: adminProvider,
    });
    const state = { selected: true };

    const firstSelection = registry.selectState(state);
    const secondSelection = registry.selectState(state);

    expect(firstSelection).toBe(secondSelection);
    expect(selectState).toHaveBeenCalledTimes(1);
    expect(registry.isOptionAvailable("autocomplete_category")).toBe(true);
    expect(registry.isOptionAvailable("autocomplete_criteria_type")).toBe(false);
  });
});
