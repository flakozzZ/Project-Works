export function filterData(data, nameProperty, searchQuery) {
    return data.filter((item) =>
        item[nameProperty].toLowerCase().includes(searchQuery.value.toLowerCase())
    );
}