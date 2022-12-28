import sys
import os
from flask import request,jsonify,Flask,make_response,redirect,send_file
from flask_restful import Resource, Api
from flask_cors import CORS
import math
import datetime
import json 
from functools import wraps
import pandas as pd
import helpers
import collections
import collections.abc
from pptx import Presentation

app = Flask(__name__)
CORS(app)
api = Api(app)

upload_path = os.path.join(os.getcwd(),"upload")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'api-key' in request.headers:
            token = request.headers['api-key']

        if not token:
            return make_response(jsonify({'message' : 'api-key is missing!'}), 401)

        try: 
            users_df = pd.read_csv("users.csv")
            current_user = users_df[users_df['key'] == token]
            assert(len(current_user) == 1)
            ix = current_user.index[0]
            current_user = dict(current_user.iloc[0])
            if (datetime.datetime.strptime(current_user['expire_date'], date_format) < datetime.datetime.now()):
               return make_response(jsonify({'message' : 'api-key is expired!'}), 401)
            if (current_user['num_requests'] > current_user['limit']):
               return make_response(jsonify({'message' : 'api-key request limit of %i hit' % current_user['limit']}), 401)
     
            body = json.loads(request.data)['body']
            if type(body) == str:
               classify_list = [clean(body)]            

            if type(body) == list:
               classify_list = [clean(item) for item in body]

            users_df.at[ix,'num_requests'] =  users_df.iloc[ix]['num_requests'] + len(classify_list)
            users_df.to_csv("users.csv",index=False)
        except Exception as e:
            print(e)
            return make_response(jsonify({'message' : 'api-key is invalid!'}), 401)

        return f(current_user, *args, **kwargs)

    return decorated


#@app.route('/autocoder', methods=['POST'])
#@token_required
#def autocoder(current_user):
#   log_output = "%s: request %i from customer %s key %s \n\n\n"  % (str(datetime.datetime.now()),current_user['num_requests'],current_user['customer_name'],current_user['key'])

       
@app.route('/process', methods=['POST'])
def process():
  try:
   pptx_filename = os.path.join(upload_path,request.files['pptx_file'].filename)
   out_filename = pptx_filename.lower().replace('.pptx','-processed.pptx')
   print(out_filename,'out')
   logo_filename = os.path.join(upload_path,request.files['logo_file'].filename)
   request.files['pptx_file'].save(pptx_filename)
   request.files['logo_file'].save(logo_filename)
   prs = Presentation(pptx_filename)
   helpers.add_logo_master_bottom_right(prs,logo_filename)
   helpers.add_title_logo(prs,logo_filename)
   helpers.change_all_title_fonts(prs,{'family':'Calibri','size':36,'bold':0,'italic':0})
   helpers.add_heading_line_breaks(prs)
   helpers.align_all_titles_fonts(prs)
   prs.save(out_filename)  
   return send_file(out_filename)
  except Exception as e:
   print(e)


@app.route('/test', methods=['GET'])
def test():
   return (jsonify({'result':'test passed!'}))
 


if __name__ == '__main__':
     app.run(host= '0.0.0.0', port='5002')
