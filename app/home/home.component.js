"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var http_get_services_1 = require("../shared/http-get/http-get.services");
var applicationSettingsModule = require("application-settings");
var router_1 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(routerExtensions, page, GetService) {
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.GetService = GetService;
        this.loggedin = false;
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        console.log("jwttoken in Home-page: " + applicationSettingsModule.getString('jwttoken', 'unset'));
        if (applicationSettingsModule.getString('jwttoken', 'unset') !== 'unset') {
            this.GetService.checkJWT()
                .subscribe(function (result) {
                if (result.authorized) {
                    _this.loggedin = true;
                }
                else {
                    _this.loggedin = false;
                    _this.routerExtensions.navigate(["login"], { clearHistory: true });
                }
            }, function (error) {
                console.log(error);
                //this.loggedin = false;
                _this.routerExtensions.navigate(["login"], { clearHistory: true });
            });
        }
        else {
            this.routerExtensions.navigate(["login"], { clearHistory: true });
        }
    };
    Object.defineProperty(HomeComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    HomeComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    HomeComponent.prototype.onNavItemTap = function (navItemRoute) {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], HomeComponent.prototype, "drawerComponent", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            providers: [http_get_services_1.HttpGetService]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            page_1.Page,
            http_get_services_1.HttpGetService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBOEY7QUFDOUYsa0VBQWdGO0FBRWhGLDBFQUFzRTtBQUN0RSxnRUFBa0U7QUFFbEUsc0RBQStEO0FBRS9ELGdDQUE2QjtBQVE3QjtJQVdJLHVCQUNZLGdCQUFrQyxFQUNsQyxJQUFVLEVBQ1YsVUFBMEI7UUFGMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZUFBVSxHQUFWLFVBQVUsQ0FBZ0I7UUFMdEMsYUFBUSxHQUFZLEtBQUssQ0FBQztJQVExQixDQUFDO0lBQ0Q7O2tFQUU4RDtJQUM5RCxnQ0FBUSxHQUFSO1FBQUEsaUJBc0JDO1FBckJHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxtQ0FBc0IsRUFBRSxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEdBQUcseUJBQXlCLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUEsQ0FBQztZQUN0RSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtpQkFDekIsU0FBUyxDQUNOLFVBQUMsTUFBTTtnQkFDUCxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3RCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2dCQUNwRSxDQUFDO1lBQ0wsQ0FBQyxFQUFFLFVBQUMsS0FBSztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQix3QkFBd0I7Z0JBQ3hCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckUsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBSSwrQ0FBb0I7YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRUQ7OztrRUFHOEQ7SUFDOUQseUNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELG9DQUFZLEdBQVosVUFBYSxZQUFvQjtRQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDM0MsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNO2FBQ2Y7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBMURvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCOzBEQUFDO0lBTHBELGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLGtDQUFjLENBQUM7U0FDOUIsQ0FBQzt5Q0FhZ0MseUJBQWdCO1lBQzVCLFdBQUk7WUFDRSxrQ0FBYztPQWQ3QixhQUFhLENBZ0V6QjtJQUFELG9CQUFDO0NBQUEsQUFoRUQsSUFnRUM7QUFoRVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xuXG5pbXBvcnQgeyBIdHRwR2V0U2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvaHR0cC1nZXQvaHR0cC1nZXQuc2VydmljZXNcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiSG9tZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCIsXG4gICAgcHJvdmlkZXJzOiBbSHR0cEdldFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIEBWaWV3Q2hpbGQgZGVjb3JhdG9yIHRvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgZHJhd2VyIGNvbXBvbmVudC5cbiAgICAqIEl0IGlzIHVzZWQgaW4gdGhlIFwib25EcmF3ZXJCdXR0b25UYXBcIiBmdW5jdGlvbiBiZWxvdyB0byBtYW5pcHVsYXRlIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcblxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcblxuICAgIGxvZ2dlZGluOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgR2V0U2VydmljZTogSHR0cEdldFNlcnZpY2VcbiAgICApIHtcblxuICAgIH1cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJqd3R0b2tlbiBpbiBIb21lLXBhZ2U6IFwiICsgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJywgJ3Vuc2V0JykpO1xuICAgICAgICBpZiAoYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJywgJ3Vuc2V0JykgIT09ICd1bnNldCcpe1xuICAgICAgICAgICAgdGhpcy5HZXRTZXJ2aWNlLmNoZWNrSldUKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5hdXRob3JpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VkaW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VkaW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImxvZ2luXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5sb2dnZWRpbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJsb2dpblwiXSx7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wibG9naW5cIl0seyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9IFxuXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xuICAgIH1cblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgb25OYXZJdGVtVGFwKG5hdkl0ZW1Sb3V0ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbbmF2SXRlbVJvdXRlXSwge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==