import React from "react"
import { navigate } from "gatsby"
import { mainColor } from "../styles/color"

import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SideBarItem = ({ isActive, displayName, handleClick }) => {
  const classes = useSideBarStyle()

  return (
    <Typography gutterBottom={true} className={clsx(isActive && classes.active)} onClick={handleClick}>
      <Button classes={{ label:  "justify-start" }} fullWidth={true}
        className={classes.tagButton}>
        <Box mx={1} textAlign="left">
          {displayName}
        </Box>
      </Button>
    </Typography>
  )
}

export default function SideBar({ heading, data, tagNameDisplayFunc, linkToFunc, isActiveFunc }) {
  return (
    <Box position="relative" width="100%">
      <Box mb={2}>
        <Typography color="textPrimary" className="uppercase">{heading}</Typography>
      </Box>
      {data.map(elem => 
        <SideBarItem
          isActive={isActiveFunc(elem)}
          displayName={tagNameDisplayFunc(elem)}
          handleClick={() => navigate(linkToFunc(elem))}
        />
      )}
  </Box>
  )
}

export function SelectBar({ heading, data, tagNameDisplayFunc, linkToFunc, isActiveFunc }) {
  const classes = useSideBarStyle()

  return (
    <FormControl fullWidth={true}>
      <InputLabel classes={{focused: classes.inputLabelOnFocused}}>{heading}</InputLabel>
      <Select 
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          },
        }}
        value={linkToFunc(data.find(elem => isActiveFunc(elem)))}
      >
        {data.map(elem =>
          <MenuItem
            value={linkToFunc(elem)}
            onClick={() => navigate(linkToFunc(elem))}
          >
            {tagNameDisplayFunc(elem)}
          </MenuItem>  
        )}
      </Select>
    </FormControl>
  )
}

const useSideBarStyle = makeStyles({
  active: {
    "& $tagButton": {
      color: mainColor[500],
      backgroundColor: mainColor[50],
      borderRadius: "15px"
    }
  },
  tagButton: {
    "&:hover": {
      color: mainColor[500],
      backgroundColor: mainColor[50],
      borderRadius: "15px"
    }
  },
  inputLabelOnFocused: {
    color: "initial !important"
  }
})

const SPY_INTERVAL = 100;

interface SpyItem {
  inView: boolean;
  element: HTMLElement;
}

 interface ScrollspyProps {
  ids: string[];
  offset: number;
  isReady: boolean;
}

interface ScrollspyState {
  items: SpyItem[];
}

// source https://medium.com/front-end-weekly/anatomy-of-a-scrollspy-component-with-react-and-typescript-1-2-c04f9d5c9bad
export class ScrollSpySideBar extends React.Component<ScrollspyProps, ScrollspyState> {
   constructor(props: any) {
    super(props);
    this.state = {
      items: []
    };
  }
  
  public static defaultProps: Partial<ScrollspyProps> = {
    offset: 2
  };
     
  private timer: number;

  private spy() {
    const items = this.props.ids
      .map(id => {
        const element = document.getElementById(id);
        if (element) {
          return {
            inView: this.isInView(element),
            element
          } as SpyItem;
        } else {
          return;
        }
      })
      .filter(item => item);

    const firstTrueItem = items.find(item => !!item && item.inView);

    if (!firstTrueItem) {
      return; // dont update state
    } else {
      const update = items.map(item => {
        return { ...item, inView: item === firstTrueItem } as SpyItem;
      });

      this.setState({ items: update });
    }
  }

  public componentDidMount() {
    this.timer = window.setInterval(() => this.spy(), SPY_INTERVAL);
  }

  public componentDidUpdate(prevProps) {
    if (prevProps.isReady !== this.props.isReady && 
        this.props.isReady === true && 
        window.location.hash) {
      this.scrollTo(document.getElementById(window.location.hash.slice(1)))
    }
  }

  public componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  private isInView = (element: HTMLElement) => {
    if (!element) {
      return false;
    }
    const { offset } = this.props;
    const rect = element.getBoundingClientRect();

    return rect.top >= 0 - offset && rect.bottom <= window.innerHeight + offset;
  };

  private scrollTo(element: HTMLElement) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
  
  public render() {
    return (
      <>
        <Box mb={2}>
          <Typography color="textPrimary" className="uppercase">contents</Typography>
        </Box>
        {this.state.items.map((item, k) => {
          return (
            <SideBarItem
              displayName={item.element.innerText}
              isActive={item.inView}
              handleClick={() => {
                this.scrollTo(item.element)
                history.replaceState({}, "", `#${item.element.id}`)
              }}
            />
          );
        })}
      </>
    );
  }
}