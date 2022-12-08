import SearchIcon from '@mui/icons-material/Search';
import { ButtonGroup, ClickAwayListener, Grow, InputBase, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useRef } from 'react';
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const options = ['People', 'Films', 'Planets', 'Starships', 'Vehicles', 'Species'];

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const navigate = useNavigate();

  const handleMenuItemClick = (event: any, index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    // @ts-ignore
    if (anchorRef.current && anchorRef.current!.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleInput = (event: any) => {
    setKeyword(event.target.value);
  }

  const handleSearch = (event: any) => {
    navigate(`/search/${options[selectedIndex].toLowerCase()}/${keyword}`, { replace: true });
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onInput={handleInput}
        placeholder="Search…."
        inputProps={{ 'aria-label': 'search' }}
      />
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button onClick={handleSearch} disabled={!keyword}>Search {options[selectedIndex]}</Button>
        <Button
          variant='outlined'
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Search>
  );
}
