import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";
import Input from "../ui/input";

type SearchListProps<T> = {
  label?: string;
  placeholder?: string;
  value?: string;
  onSearch: (query: string) => Promise<T[]>;
  onSelect: (item: T) => void;
  getLabel: (item: T) => string;
  renderItem?: (item: T) => React.ReactNode;
  debounceTime?: number;
  clearOnSelect?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
};

function SearchList<T>({
  label,
  placeholder,
  value,
  onSearch,
  onSelect,
  getLabel,
  renderItem,
  debounceTime = 300,
  clearOnSelect = true,
  rightIcon,
  onRightIconPress = () => {},
}: SearchListProps<T>) {
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await onSearch(query);
        setResults(data || []);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [debounceTime, onSearch, query]);

  return (
    <View>
      <Input
        label={label}
        placeholder={placeholder}
        value={query}
        onChangeText={setQuery}
        rightIcon={rightIcon}
        onRightIconPress={() => onRightIconPress()}
      />

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(_, index) => index.toString()}
          keyboardShouldPersistTaps="always"
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll={false}
          showsVerticalScrollIndicator={true}
          style={{
            maxHeight: 200,
            minHeight: 200,
            borderWidth: 1,
            borderColor: "#ccc",
            marginTop: 5,
            borderRadius: 5,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onSelect(item);
                if (clearOnSelect) {
                  setQuery("");
                } else {
                  setQuery(getLabel(item));
                }
                setResults([]);
              }}
              style={{
                padding: 4,
                borderBottomWidth: 1,
                borderColor: "#212020",
              }}
            >
              {renderItem ? (
                renderItem(item)
              ) : (
                <ThemedText lightColor="#000" darkColor="#fff">
                  {getLabel(item)}
                </ThemedText>
              )}
            </TouchableOpacity>
          )}
        />
      )}

      {!loading && query && results.length === 0 && (
        <ThemedText lightColor="#000" darkColor="#fff" style={{ padding: 10 }}>
          No results
        </ThemedText>
      )}
    </View>
  );
}

export default SearchList;
