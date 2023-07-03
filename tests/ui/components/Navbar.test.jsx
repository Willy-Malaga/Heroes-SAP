const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter, useNavigate } = require("react-router-dom");
const { AuthContext } = require("../../../src/auth/context/AuthContext");
const { Navbar } = require("../../../src/ui/components/Navbar");

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar />', () => {

  const contextValue = {
    logged: true,
    user: {
      name: 'Juan Carlos'
    },
    logout: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks());

  test('Debe de mostrar el nombre del usuario', () => {

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar/>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getByText('Juan Carlos')).toBeTruthy();
    
  })

  test('Debe de llamar al logout y navigate cuando se hace click en el botón', () => {
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar/>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn);

    expect( contextValue.logout ).toHaveBeenCalled();
    expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});

  });  
  
});
