import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";

type Item = {
  label: string;
  value: string;
  searchResult?: object;
};

type Props = {
  label?: string;
  placeholder?: string;
  onSearch: (query: string) => Promise<Item[]>;
  onSelect: (item: Item | null, input: string) => void;
  allowCustomInput?: boolean;
  value?: string; // selected id
  initialLabel?: string; // label for initial value
};

const SearchSelect = ({
  label,
  placeholder,
  onSearch,
  onSelect,
  allowCustomInput = false,
  value,
  initialLabel,
}: Props) => {
  const [suggestions, setSuggestions] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  // 🔍 Fetch suggestions
  const handleSearch = useCallback(
    async (text: string) => {
      setInputText(text);

      if (!text || text.length < 2) {
        setSuggestions(null);
        return;
      }

      setLoading(true);

      try {
        const result = await onSearch(text);

        setSuggestions(
          result.map((item) => ({
            id: item.value,
            title: item.label,
          })),
        );
      } catch (e) {
        console.error("Search error:", e);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    },
    [onSearch],
  );

  // 🎯 Handle select
  const handleSelectItem = (item: any) => {
    if (item) {
      onSelect({ label: item.title, value: item.id }, item.title);
    } else if (allowCustomInput) {
      onSelect(null, inputText);
    }
  };

  // 🧠 Inject initial item into dataset (important!)
  useEffect(() => {
    if (value && initialLabel) {
      setSuggestions((prev) => [
        { id: value, title: initialLabel },
        ...(prev || []),
      ]);
    }
  }, [value, initialLabel]);

  return (
    <AutocompleteDropdownContextProvider>
      <View style={{ marginBottom: 16 }}>
        {label && <Text style={{ marginBottom: 6 }}>{label}</Text>}

        <AutocompleteDropdown
          dataSet={suggestions}
          onChangeText={handleSearch}
          onSelectItem={handleSelectItem}
          debounce={400}
          loading={loading}
          useFilter={false} // IMPORTANT for API search :contentReference[oaicite:2]{index=2}
          closeOnBlur={true}
          initialValue={value || undefined}
          textInputProps={{
            placeholder: placeholder || "Search...",
          }}
          EmptyResultComponent={
            allowCustomInput && inputText ? (
              <TouchableOpacity onPress={() => handleSelectItem(null)}>
                <Text style={{ padding: 10, color: "blue" }}>
                  Add + &#34;{inputText}&#34;
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ padding: 10 }}>No results</Text>
            )
          }
          flatListProps={{
            nestedScrollEnabled: true,
          }}
          suggestionsListMaxHeight={200}
          direction="down" // or "up" if you want it to open upwards
          containerStyle={{ zIndex: 1000 }}
        />
      </View>
    </AutocompleteDropdownContextProvider>
  );
};

export default SearchSelect;
