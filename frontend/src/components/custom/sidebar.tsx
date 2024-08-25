import SideBarItem from "./sidebar-item";

export default function SideBar() {
  return (
    <div className="bg-white h-screen w-full">
      <nav className="pt-4 pl-4">
        <ul>
          <SideBarItem text="Usuarios" href="/admin/users" icon=""/>
          <SideBarItem text="Pedidos" href="/admin/orders" icon=""/>
          <SideBarItem text="Envios" href="/admin/shipments" icon=""/>
          <SideBarItem text="Productos" href="/admin/products" icon=""/>
        </ul>
      </nav>
    </div>
  );
}
