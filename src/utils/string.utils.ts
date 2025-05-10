export const truncate = (limit: number, value?: string) => {
    if (!value) return "";
    return value.length > limit ? value.slice(0, limit) + "..." : value;
}