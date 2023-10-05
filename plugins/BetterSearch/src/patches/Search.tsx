import { findByName, findByProps } from "@vendetta/metro";
import { ReactNative, React } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { General } from "@vendetta/ui/components";

const { TouchableOpacity } = General;
const { TextInput } = ReactNative;

const Locale = findByProps("Messages");
const s = findByProps("SEARCH_PAGE_SIZE");

export default function patch() {
    return after("default", findByName("ConnectedSearchResults", false), (a, b) => {
      after("render", b.type.prototype, (_, c)=>{
        if (!c?.props?.children?.[1].type) return;
        after("type", c.props.children[1], ([pr], d)=>{
          if (!d?.props?.children?.[1]) return;
          console.log(pr);
          let t = d.props.children[1];
          const [pageVal, setPageVal] = React.useState(1+Math.floor(pr.offset/pr.pageLength));
          t.props.children = Locale.Messages.PAGINATION_PAGE_OF.format({page: pageVal, totalPages: 1+Math.floor(pr.totalResults/pr.pageLength)}) + '  |  ' + t.props.children.split('  |  ')[1]
          const textInputRef = React.useRef<any>(null);
          d.props.children[1] = 
          [<TouchableOpacity onPress={()=>{textInputRef?.current?.focus?.();}} style={{flex: 1, height: 18}}>{t}</TouchableOpacity>,
          <TextInput
            keyboardType='numeric'
            style={{ position: 'absolute', left: -9999 }}
            ref={textInputRef}
            value={String(pageVal)}
            onChangeText={(e)=>{setPageVal(Number(e)); console.log(e)}}
            onBlur={()=>{
              let psize = s.SEARCH_PAGE_SIZE;
              if (pageVal*psize-psize === pr.offset) return;
              if (pageVal*psize > pr.offset) {
                s.SEARCH_PAGE_SIZE = pageVal*psize-pr.offset-psize;
                pr.searchNextPage();
              } else {
                s.SEARCH_PAGE_SIZE = pr.offset-pageVal*psize+psize;
                pr.searchPreviousPage();
              }
              s.SEARCH_PAGE_SIZE = psize;
            }}
            />
          ];
        }, false);
      }, true);
    });
  };