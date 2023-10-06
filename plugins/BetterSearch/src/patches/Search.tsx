import { findByName, findByProps } from "@vendetta/metro";
import { ReactNative, React } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { General } from "@vendetta/ui/components";

const { TouchableOpacity } = General;
const { TextInput } = ReactNative;

const Locale = findByProps("Messages");
const SearchingModule = findByProps("SEARCH_PAGE_SIZE");

export default function patch() {
    return after("default", findByName("ConnectedSearchResults", false), (_, searchResultsRes) => {
        after("render", searchResultsRes.type.prototype, (_, renderRes) => {
            if (!renderRes?.props?.children?.[1].type) return;

            after("type", renderRes.props.children[1], ([paging], typeRes) => {
                const [page, setPage] = React.useState(1 + Math.floor(paging.offset / paging.pageLength));
                const inputRef = React.useRef<any>(null);

                const endpoint = typeRes?.props?.children?.[1];
                if (!endpoint) return;
                
                endpoint.props.children = Locale.Messages.PAGINATION_PAGE_OF.format({
                    page,
                    totalPages: 1 + Math.floor(paging.totalResults / paging.pageLength)
                }) + '  |  ' + endpoint.props.children.split('  |  ')[1];

                typeRes.props.children[1] = [
                    <TouchableOpacity 
                        onPress={() => inputRef?.current?.focus?.()} 
                        style={{ flex: 1, height: 18 }}
                    >
                        {endpoint}
                    </TouchableOpacity>,
                    <TextInput
                        keyboardType='numeric'
                        style={{ position: 'absolute', left: -9999 }}
                        ref={inputRef}
                        value={String(page)}
                        onChangeText={(e) => setPage(Math.min(Math.max(Number(e), 1), Math.ceil(paging.totalResults/SearchingModule.SEARCH_PAGE_SIZE)))}
                        onBlur={() => {
                            const pageSize = SearchingModule.SEARCH_PAGE_SIZE;
                            if (page * pageSize - pageSize === paging.offset) return;

                            if (page * pageSize > paging.offset) {
                                SearchingModule.SEARCH_PAGE_SIZE = page * pageSize - paging.offset - pageSize;
                                paging.searchNextPage();
                            } else {
                                SearchingModule.SEARCH_PAGE_SIZE = paging.offset - page * pageSize + pageSize;
                                paging.searchPreviousPage();
                            }
                            
                            SearchingModule.SEARCH_PAGE_SIZE = pageSize;
                        }}
                    />
                ];
            }, false);
        }, true);
    });
};