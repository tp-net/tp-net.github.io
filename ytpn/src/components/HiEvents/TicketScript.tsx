'use client';

// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// /**
//  * HiEvents Script Loading Context
//  * 
//  * Functional Requirements:
//  * - Provide script loading state to consumers
//  * - Manage async loading of HiEvents widget script
//  * - Handle loading errors gracefully
//  * - Prevent duplicate script loading
//  * - Provide loading, loaded, and error states
//  */

// interface HiEventsScriptContextType {
//   isScriptLoading: boolean;
//   isScriptLoaded: boolean;
//   scriptError: string | null;
//   retryLoadScript: () => void;
// }

// const HiEventsScriptContext = createContext<HiEventsScriptContextType | undefined>(undefined);

// interface HiEventsScriptProviderProps {
//   children: ReactNode;
//   scriptUrl?: string;
// }

// export function HiEventsScriptProvider({ 
//   children, 
//   scriptUrl = "https://hi-events-all-in-one-816636667737.australia-southeast1.run.app/widget.js" 
// }: HiEventsScriptProviderProps) {
//   const [isScriptLoading, setIsScriptLoading] = useState<boolean>(false);
//   const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
//   const [scriptError, setScriptError] = useState<string | null>(null);

//   const loadScript = React.useCallback(() => {
//     // Check if script is already loaded
//     if (isScriptLoaded || isScriptLoading) {
//       return;
//     }

//     // Check if script element already exists
//     const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
//     if (existingScript) {
//       setIsScriptLoaded(true);
//       return;
//     }

//     setIsScriptLoading(true);
//     setScriptError(null);

//     const script = document.createElement('script');
//     script.src = scriptUrl;
//     script.async = true;
    
//     script.onload = () => {
//       setIsScriptLoading(false);
//       setIsScriptLoaded(true);
//       setScriptError(null);
//     };

//     script.onerror = () => {
//       setIsScriptLoading(false);
//       setIsScriptLoaded(false);
//       setScriptError(`Failed to load HiEvents script from ${scriptUrl}`);
//     };

//     document.head.appendChild(script);
//   }, [scriptUrl, isScriptLoaded, isScriptLoading]);

//   const retryLoadScript = React.useCallback(() => {
//     setScriptError(null);
//     setIsScriptLoaded(false);
//     setIsScriptLoading(false);
//     loadScript();
//   }, [loadScript]);

//   // Load script on mount
//   useEffect(() => {
//     loadScript();
//   }, [loadScript]);

//   const contextValue: HiEventsScriptContextType = {
//     isScriptLoading,
//     isScriptLoaded,
//     scriptError,
//     retryLoadScript,
//   };

//   return (
//     <HiEventsScriptContext.Provider value={contextValue}>
//       {children}
//     </HiEventsScriptContext.Provider>
//   );
// }

// export function useHiEventsScript(): HiEventsScriptContextType {
//   const context = useContext(HiEventsScriptContext);
//   if (context === undefined) {
//     throw new Error('useHiEventsScript must be used within a HiEventsScriptProvider');
//   }
//   return context;
// }

export default function TicketScript() {
  return (
    <script 
        async 
        src="https://hi-events-all-in-one-816636667737.australia-southeast1.run.app/widget.js"
      ></script>
  );
}