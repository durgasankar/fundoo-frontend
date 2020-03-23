import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { LabelService } from "src/app/services/label.service";
import { Label } from "src/app/models/label";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-edit-label",
  templateUrl: "./edit-label.component.html",
  styleUrls: ["./edit-label.component.scss"]
})
export class EditLabelComponent implements OnInit {
  newLabel: Label = new Label();
  token = localStorage.getItem("token");

  labelsList: Label[];

  constructor(
    private labelService: LabelService,
    private dialogRef: MatDialogRef<EditLabelComponent>,
    private _router: Router,
    private _matSnackBar: MatSnackBar,
    private _labelService: LabelService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._labelService.autoRefesh.subscribe(() => {
      this.displayAllLabels();
    });
    this.labelsList = data.labelsList;
  }

  ngOnInit() {
    this.displayAllLabels();
  }

  // onSubmit() {
  //   this.dialogRef.close();
  //   if (this.label.labelName !== null) {
  //     this.labelService.createLabel(this.label).subscribe(
  //       (response: any) => {
  //         console.log(response);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   }
  // }
  createLabel(labelInput) {
    console.log("labelName entered : ", labelInput.value);
    this._labelService.createLabel(this.newLabel).subscribe(
      response => {
        console.log("response : ", response);
        // if label with the above entered name is already present in the database.
        if (response.statusCode === 208) {
          this._matSnackBar.open(response.message, "ok", {
            duration: 4000
          });
        } else {
          this._matSnackBar.open(response.message + " sucessfully!", "ok", {
            duration: 4000
          });
        }
      },
      errors => {
        console.log("errors : ", errors);
        if (errors.error.statusCode === 401) {
          localStorage.clear();
          this._router.navigateByUrl(`${environment.LOGIN_URL}`);
          this._matSnackBar.open(
            errors.error.message + " , login to continue.",
            "Opps!",
            {
              duration: 5000
            }
          );
        } else {
          this._matSnackBar.open(errors.error.message, "ok", {
            duration: 4000
          });
        }
      }
    );
    // after creation of level the value will be set to empty
    labelInput.value = "";
  }

  cancel(labelInput) {
    console.log("labelInput ref on hit cancel : ", labelInput);
    // if cancel is hit then the value will be reseted
    labelInput.labelName = "";
  }

  displayAllLabels() {
    console.log("getting all labels : ");
    this._labelService.getAllLabelsList().subscribe(response => {
      console.log("response : ", response);
      this.labelsList = response.obj;
    });
  }
}
