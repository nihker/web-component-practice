import { Component, Prop, State } from "@stencil/core";


@Component({
    tag: 'nk-side-drawer',
    styleUrl: 'side-drawer.css',
    shadow: true
})
export class SideDrawer {

    @State() showContactInfo = false;

    @Prop({ reflectToAttr: true }) title: string;
    @Prop({ reflectToAttr: true, mutable: true }) open: boolean;

    onCloseDrawer() {
        console.log("Close Drawer inside the Component....");
        this.open = false;
    }

    onContentChange(content: string) {
        this.showContactInfo = content === 'contact';
    }

    render() {
        let mainContent = <slot />
        if (this.showContactInfo) {
            mainContent = (
                <div id="contact-info">
                    <h2>Contact Information</h2>
                    <p>You can reach us via phone or email</p>
                    <ul>
                        <li>Phone: 54856464648</li>
                        <li>Email: <a href="mailto:test@test.com">test@test.com</a></li>
                    </ul>
                </div>
            );
        }
        return (
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                </header>
                <section id="tabs">
                    <button class="active" onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
                    <button onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
                </section>
                <main>
                    {mainContent}
                </main>
            </aside>
        );
    }
}