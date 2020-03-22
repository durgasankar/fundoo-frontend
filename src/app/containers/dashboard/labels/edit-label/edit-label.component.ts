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
  hitCancel: boolean;
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

  cancel() {
    this.hitCancel = true;
  }

  // createLabel() {
  //   console.log("Label creation: ", this.label.labelName);
  //   this.labelService.createLabel(this.label).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

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

  displayAllLabels() {
    console.log("getting all labels : ");
    this._labelService.getAllLabelsList().subscribe(response => {
      console.log("response : ", response);
      this.labelsList = response.obj;
    });
  }
}
