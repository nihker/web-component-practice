import { Component, Prop } from "@stencil/core";


@Component({
    tag: 'nk-side-drawer',
    styleUrl: 'side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @Prop({ reflectToAttr: true }) title: string;
    @Prop({ reflectToAttr: true, mutable: true }) open: boolean;

    onCloseDrawer () {
        console.log("Close Drawer inside the Component....");
        this.open = false;
    }

    render () {
        // let content = null;
        // if(this.open) {
        //     content = (
        //         <aside>
        //             <header><h1>{ this.title }</h1></header>
        //             <main>
        //                 <slot />
        //             </main>
        //         </aside>
        //     )
        // }
        return (
            <aside>
                    <header>
                        <h1>{ this.title }</h1>
                        <button onClick={ this.onCloseDrawer.bind(this) }>X</button>
                    </header>
                    <section id="tabs">
                        <button class="active">Navigation</button>
                        <button>Contact</button>
                    </section>
                    <main>
                        <slot />
                    </main>
                </aside>
        );
    }
}