# React Project Structure

A well-organized project structure makes your codebase more maintainable, scalable, and easier for teams to navigate. By breaking down your application into smaller, focused components, you gain several key benefits:

**Why Component-Based Structure?**
- **Reusability**: Components can be used across multiple pages without duplicating code
- **Maintainability**: Smaller, focused components are easier to understand, test, and update
- **Scalability**: As your project grows, a clear structure prevents the codebase from becoming chaotic
- **Collaboration**: Team members can work on different components independently without conflicts

## Structure

```
src/
├── components/
│   ├── TaskCard/
│   │   ├── TaskCard.jsx
│   │   └── TaskCard.css
│   ├── TaskForm/
│   │   ├── TaskForm.jsx
│   │   └── TaskForm.css
│   └── TaskList/
│       ├── TaskList.jsx
│       └── TaskList.css
├── pages/
│   ├── HomePage.jsx
│   └── StatPage.jsx
├── App.css
├── App.jsx
├── main.jsx
└── index.css
```

## Component Hierarchy Diagram

```mermaid
graph TD
    A["App.jsx"]
    B["pages/HomePage.jsx"]
    C["pages/StatPage.jsx"]
    D["TaskList"]
    E["TaskForm"]
    F["TaskCard"]
    G["TaskCard<br/>TaskCard<br/>TaskCard"]
    
    A --> B
    A --> C
    B --> D
    D --> E
    D --> G
    
    style A fill:#61dafb,stroke:#333,stroke-width:2px,color:#000
    style B fill:#fff9e6,stroke:#333,stroke-width:2px
    style C fill:#fff9e6,stroke:#333,stroke-width:2px
    style D fill:#e6f3ff,stroke:#333,stroke-width:2px
    style E fill:#e6f3ff,stroke:#333,stroke-width:2px
    style F fill:#e6f3ff,stroke:#333,stroke-width:2px
    style G fill:#f0f0f0,stroke:#333,stroke-width:2px
```

## Key Principles

- **One Component Per File**: Each component gets its own JSX file with corresponding styles
- **Co-locate Styles**: Keep CSS files next to their components for easier management
- **Pages vs Components**: Use `pages/` for full route views, `components/` for reusable UI elements
- **Global Styles**: Store shared styles in the `styles/` directory
