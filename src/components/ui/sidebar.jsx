import React, { createContext, useContext, useState } from 'react';

// Context for sidebar state
const SidebarContext = createContext();

// Export the context so other components can use it
export { SidebarContext };

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="flex min-h-screen bg-gray-50">
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({ children }) {
  const { isOpen } = useContext(SidebarContext);
  
  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} ${!isOpen ? 'sidebar-collapsed' : ''}`}>
      <div className={`overflow-hidden ${isOpen ? '' : 'text-center'}`}>
        {children}
      </div>
    </div>
  );
}

export function SidebarContent({ children }) {
  const { isOpen } = useContext(SidebarContext);
  
  return (
    <div className={`h-full transition-all duration-300 ${isOpen ? 'p-4' : 'p-2'}`}>
      {children}
    </div>
  );
}

export function SidebarGroup({ children }) {
  return (
    <div className="mb-8">
      {children}
    </div>
  );
}

export function SidebarGroupLabel({ children, className = "" }) {
  const { isOpen } = useContext(SidebarContext);
  
  if (!isOpen) return null;
  
  return (
    <h3 className={`text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 ${className}`}>
      {children}
    </h3>
  );
}

export function SidebarGroupContent({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

export function SidebarMenu({ children, className = "" }) {
  return (
    <nav className={`space-y-1 ${className}`}>
      {children}
    </nav>
  );
}

export function SidebarMenuItem({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

export function SidebarMenuButton({ children, asChild, className = "" }) {
  const { isOpen } = useContext(SidebarContext);
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `w-full flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors ${children.props.className || ''} ${className}`.trim()
    });
  }
  
  return (
    <button className={`w-full flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors ${className}`}>
      {children}
    </button>
  );
}

export function SidebarTrigger({ className = "" }) {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  
  return (
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className={`p-2 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700 ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </button>
  );
}