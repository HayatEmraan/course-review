# Assignment 3: Course Review

Develop a Course Review application using TypeScript and Express.js. MongoDB, with Mongoose as the ODM, will handle data storage. Users can add, edit, and delete course reviews.

## Technology Stack:

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Object Data Modeling (ODM) and Validation Library:** Mongoose for MongoDB

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-HayatEmraan

   ```

2. Navigate to the project directory:

   ```bash
   npm install
   # or
   yarn
   ```

3. First, run the development server:
   ```bash
   // locally deployment 
   npm run dev    
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev

   // producation deployment
    npm run build
    # then
    npm start
   ```

## DotENV Configuration
 ```bash
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017
   PORT=5000
   ```



## API Reference

#### 1. Create a Course

```http
  POST /api/course
```
- Request Body:

```json
{
    "title": "Basic JavaScript",
    "instructor": "Jane Doe",
    "categoryId": "123456789012345678901234",
    "price": 49.99,
    "tags": [
        {
            "name": "Programming",
            "isDeleted": false
        },
        {
            "name": "Web Development",
            "isDeleted": false
        }
    ],
    "startDate": "2023-01-15",
    "endDate":"2023-03-14",
    "language": "English",
    "provider": "Tech Academy",
    "details": {
        "level": "Intermediate",
        "description": "Detailed description of the course"
    }
}
```
- Response:

```json
{
    "success": true,
    "statusCode": 201,
    "message": "Course created successfully",
    "data": {
        "_id": "23245dsfd453242348rFcg",
        "title": "Sample Course",
        "instructor": "Jane Doe",
        "categoryId": "123456789012345678901234",
        "price": 49.99,
        "tags": [
            {
                "name": "Programming",
                "isDeleted": false
            },
            {
                "name": "Web Development",
                "isDeleted": false
            }
        ],
        "startDate": "2023-01-15",
        "endDate":"2023-03-14",
        "language": "English",
        "provider": "Tech Academy",
        "durationInWeeks": 9, // calculated from the start and end dates
        "details": {
            "level": "Intermediate",
            "description": "Detailed description of the course",
        }
    }
}
```

#### 2. Get Paginated and Filtered Courses. Don’t use the query builder technique which is shown in the module. Use your own implementation for pagination & filtering.

```http
  GET /api/courses
```
- Response

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Courses retrieved successfully",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 50
    },
    "data": [
        {
            "_id": "23245dsfd453242348rFcg",
            "title": "Sample Course",
            "instructor": "Jane Doe",
            "categoryId": "123456789012345678901234",
            "price": 49.99,
            "tags": [
                {
                    "name": "Programming",
                    "isDeleted": false
                },
                {
                    "name": "Web Development",
                    "isDeleted": false
                }
            ],
            "startDate": "2023-01-15",
            "endDate":"2023-03-14",
            "language": "English",
            "provider": "Tech Academy",
            "durationInWeeks": 9,
            "details": {
                "level": "Intermediate",
                "description": "Detailed description of the course",
            }
        },
        // more courses
    ]
}
```

#### 3. Create a Category

```http
  POST /api/categories
```
- Request Body:
```json
{
    "name": "Programming"
}

```
- Response

```json
{
    "success": true,
    "statusCode": 201,
    "message": "Category created successfully",
    "data": {
        "_id": "132132131312321321",
        "name": "Programming"
    }
}
```

#### 4. Get All Categories

```http
  GET /api/categories
```

- Response

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Categories retrieved successfully",
    "data": [
        {
            "_id": "23245dsfd453242348rFcg",
            "name": "Programming"
        },
        // more categories
    ]
}
```

#### 5. Create a Review

```http
  POST /api/reviews
```
- Request Body:

```json
{
    "courseId": "123456789012345678901234",
    "rating": 4,
    "review": "Great course!"
}

```
- Response
```json
{
    "success": true,
    "statusCode": 201,
    "message": "Review created successfully",
    "data": {
        "_id": "32432432kk234243234",
        "courseId": "123456789012345678901234",
        "rating": 4,
        "review": "Great course!"
    }
}
```

#### 6. Update a Course (Partial Update with Dynamic Update)

```http
  PUT /api/courses/:courseId
```
- Request Body:

```json
{
    "title": "Updated Title",
    "instructor": "New Instructor",
    "categoryId": "123456789012345678901234",
    "price": 59.99,
    "tags": [
        {
            "name": "Programming",
            "isDeleted": true
        },
        {
            "name": "Web Development",
            "isDeleted": false
        }
    ],
    "startDate": "2023-02-01",
    "endDate":"2023-03-14",
    "language": "Spanish",
    "provider": "Code Masters",
    "durationInWeeks": 6,
    "details": {
        "level": "Intermediate",
        "description": "Detailed description of the course"
    }
}
```

- Response: 

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Course updated successfully",
    "data": {
        "_id": "s734kjsfsdfdsfsssfs8888",
        "title": "Updated Title",
        "instructor": "New Instructor",
        "categoryId": "123456789012345678901234",
        "price": 59.99,
        "tags": [
            {
                "name": "Programming",
                "isDeleted": true
            },
            {
                "name": "Web Development",
                "isDeleted": false
            }
        ],
        "startDate": "2023-02-01",
        "endDate":"2023-03-14",
        "language": "Spanish",
        "provider": "Code Masters",
        "durationInWeeks": 6,
        "details": {
            "level": "Intermediate",
            "description": "Detailed description of the course"
        }
    }
}
```

#### 7. Get Course by ID with Reviews
```http
  GET /api/courses/:courseId/reviews
```
- Response:
```json
{
    "success": true,
    "statusCode": 200,
    "message": "Course and Reviews retrieved successfully",
    "data": {
        "course": {
            "_id": "123456789012345678901234",
            "title": "Updated Title",
            "instructor": "New Instructor",
            "categoryId": "123456789012345678901234",
            "price": 59.99,
            "tags": [
                {
                    "name": "Programming",
                    "isDeleted": false
                },
                {
                    "name": "Web Development",
                    "isDeleted": false
                }
            ],
            "startDate": "2023-02-01",
            "endDate":"2023-03-14",
            "language": "Spanish",
            "provider": "Code Masters",
            "durationInWeeks": 6,
            "details": {
                "level": "Intermediate",
                "description": "Detailed description of the course"
            }
        },
        "reviews": [
            {
                "courseId": "123456789012345678901234",
                "rating": 5,
                "review": "Awesome course!"
            },
            {
                "courseId": "123456789012345678901234",
                "rating": 4,
                "review": "Great content!"
            }
            // Additional reviews
        ]
    }
}  
```

#### 8. Get the Best Course Based on Average Review (Rating)
```http
  GET /api/users/:userId/orders/total-price
```
- Response:
```json
{
    "success": true,
    "statusCode": 200,
    "message": "Best course retrieved successfully",
    "data": {
        "course": {
            "_id": "23245dsfd453242348rFcg",
            "title": "Best Book Title",
            "instructor": "New Instructor",
            "categoryId": "123456789012345678901234",
            "price": 59.99,
            "tags": [
                {
                    "name": "Programming",
                    "isDeleted": false
                },
                {
                    "name": "Web Development",
                    "isDeleted": false
                }
            ],
            "startDate": "2023-02-01",
            "endDate":"2023-03-14",
            "language": "Spanish",
            "provider": "Code Masters",
            "durationInWeeks": 6,
            "details": {
                "level": "Intermediate",
                "description": "Detailed description of the course"
            }
        },
        "averageRating": 4.8,
        "reviewCount": 50
    }
}
```
