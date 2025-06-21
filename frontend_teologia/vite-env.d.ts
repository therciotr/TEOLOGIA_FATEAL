/// <reference types="vite/client" />

// Importação de imagens como strings
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}
declare module '*.jpeg' {
  const content: string;
  export default content;
}
declare module '*.gif' {
  const content: string;
  export default content;
}
declare module '*.webp' {
  const content: string;
  export default content;
}

// Importação padrão de SVG como string
declare module '*.svg' {
  const content: string;
  export default content;
}

// Importação opcional de SVG como componente React
declare module '*.svg?component' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}

// Suporte a arquivos JSON
declare module '*.json' {
  const value: any;
  export default value;
}
