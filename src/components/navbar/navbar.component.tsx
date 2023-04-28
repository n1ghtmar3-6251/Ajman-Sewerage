import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
// @ts-ignore
// @ts-ignore
import {
  Box,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Stack,
  Paper,
  MenuList,
  Popper,
  Grow,
  ClickAwayListener,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { routes, loggedInRoutes } from '../../routes'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import downArrow from '../../assets/downArrow.svg'
import { Props } from './Navbar.interface'
import SideBar from '../SideBar/SideBar'
import WheelChairMenu from '../wheelchair/WheelChair'
import { NavDiv } from '../wheelchair/wheelChair.styled'
import { Memory } from '../../core/Memory'
import { MenuLink } from './Navbar.styles'

const Navbar: FC<Props> = ({ isLoggedIn }: Props): ReactElement => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [list, setList] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleDrawer = () => {
    setDrawer(!drawer)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const renderSubMenu = (page: any) => {
    const { childrenRoutes } = page
    //const username = Memory.getItem('username')
    const username = Memory.getItem('fullName')

    return (
      <Box ref={anchorRef}>
        <Stack direction='row' spacing={2}>
          <Box
            id='composition-button'
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleToggle}
            component={NavLink}
          >
            <Box
              component={NavLink}
              color='primary.main'
              sx={{
                fontSize: '0.875rem',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                fontWeight: 700,
                color: page.textColor || 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', display: 'flex', justifyContent: 'space-between', width: '8rem' }}>
                <div style={{ marginRight: '1rem' }}>
                  {page.icon && <img src={page.icon} alt='' />}
                </div>
                {/* {page.title && page.title} */}
                {username}
              </Box>
              <Box sx={{ paddingLeft: '2rem' }}>
                <img src={downArrow} alt='Down Arrow' />
              </Box>
            </Box>
          </Box>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement='top-end'
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper
                  sx={{
                    backgroundColor: 'rgb(16, 30, 142)',
                    width: '100%',
                    height: '100%',
                    maxHeight: 'unset',
                    maxWidth: 'unset',
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id='composition-menu'
                      aria-labelledby='composition-button'
                      onKeyDown={handleListKeyDown}
                    >
                      {childrenRoutes.map((child: any, index: number) => {
                        const { path, title, icon } = child
                        return (
                          <MenuLink href={path}>
                            {/* <img src={icon} alt='Down Arrow' /> */}
                            <MenuItem onClick={handleClose}>{title}</MenuItem>
                          </MenuLink>
                        )
                      })}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Stack>
      </Box>
    )
  }

  const renderNavBarRoutes = (routesTorRender: any) => {
    return routesTorRender.map((page: any, index: number) => {
      const { path, type, children } = page
      const shouldRenderSubMenu = type === 'menu'

      return (
        <div
          key={index}
          style={{
            borderRight: '1px white solid',
            minHeight: '64px',
            alignItems: 'center',
            justifyContent: 'flex-end',
            display: 'flex',
            textAlign: 'center',
            backgroundColor: page.backgroundColor || 'none',
          }}
          onMouseOver={() => {
            page.key === 'wheelchair-route' && setList(true)
          }}
          onMouseOut={() => setList(false)}
        >

{/* logout */}

          {!shouldRenderSubMenu && (
            <Link
              component={NavLink}
              to={page.path}
              color='primary.main'
              underline='none'
              variant='button'
              sx={{
                fontSize: '0.875rem',
                marginLeft: '2rem',
                marginRight: '2rem',
                fontWeight: 700,
                color: page.textColor || 'none',
              }}
            >
              {page.icon && <img src={page.icon} alt='' />}
              {page.title && page.title}
              <img src={downArrow} alt='Down Arrow' />
            </Link>
          )}
          {shouldRenderSubMenu && renderSubMenu(page)}
        </div>
      )
    })
  }

  const routesTorRender = isLoggedIn ? loggedInRoutes : routes

  return (
    <Box
      sx={{
        paddingLeft: '1.25rem',
        // paddingRight: '1.25rem',
        width: '100%',
        height: 'auto',
        backgroundColor: 'primary.light',
        boxShadow: 'rgb(17 17 26 / 10%) 0px 2px 5px;',
        zIndex: '9999',
      }}
    >
      <Container maxWidth={false} sx={{ margin: '0', padding: '0 !important' }}>
        <Toolbar disableGutters variant='dense'>
          <Typography
            variant='h6'
            // noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <img src={logo} alt='' />
          </Typography>

          <Typography
            variant='h6'
            // noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logo} alt='' />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              {renderNavBarRoutes(routesTorRender)}
            </Box>
          </Box>
          {list && (
            <NavDiv
              onMouseOver={() => {
                setList(true)
              }}
              onMouseOut={() => {
                setList(false)
              }}
            >
              <WheelChairMenu />
            </NavDiv>
          )}
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }} className='responsive-navbar'>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='primary'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
                routes.map((page: any) => (
                  <Link
                    key={page.key}
                    component={NavLink}
                    to={page.path}
                    color='black'
                    underline='none'
                    variant='button'
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      {page.icon && <img src={page.icon} alt='' />}
                      <Typography textAlign='center'>{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))
                // : loggedInRoutes.map((page) => (
                //     <Link
                //       key={page.key}
                //       component={page.component}
                //       to={page.path}
                //       color={"black"}
                //       underline="none"
                //       variant="button"
                //     >
                //       <MenuItem onClick={handleCloseNavMenu}>
                //         {page.icon && <img src={page.icon} alt="" />}
                //         <Typography textAlign="center">{page.title}</Typography>
                //       </MenuItem>
                //     </Link>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {/* <Drawer anchor="right" open={drawer} style={{ zIndex: "999999999999" }}>
        <SideBar onClick={() => setDrawer(false)} />
      </Drawer> */}
    </Box>
  )
}

export default Navbar
